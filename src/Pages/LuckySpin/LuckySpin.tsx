import "./LuckySpin.css";
import {
  Badge,
  Button,
  Image,
  Product,
  ProductCard,
  SafeArea,
  Skeleton,
  useAsyncStorage,
  useNavigateWithTransition,
  useProductSearch,
} from "@shopify/shop-minis-react";
import { Gift, Lock, RefreshCw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SpinPhase =
  | "loading"
  | "ready"
  | "spinning-first"
  | "first-shown"
  | "spinning-second"
  | "second-shown"
  | "locked"
  | "empty"
  | "error";

type DailyRecord = {
  dateKey: string;
  firstWinnerProductId: string;
  secondWinnerProductId?: string;
  usedSecondSpin: boolean;
  completedAt: string;
};

type SpinProduct = Product & {
  spinMeta: {
    priceAmount: number;
    compareAtAmount: number;
    discountPercent: number;
    savingsAmount: number;
  };
};

const STORAGE_KEY = "lucky_spin_daily_record";
const SPIN_QUERY = "Fashion";
const BOARD_SIZE = 8;
const BOARD_ORDER = [0, 1, 2, 5, 8, 7, 6, 3] as const;

function getTodayKey() {
  return new Date().toLocaleDateString("en-CA");
}

function parseAmount(value: unknown) {
  const amount = Number(value ?? 0);
  return Number.isFinite(amount) ? amount : 0;
}

function normalizeProduct(product: Product): SpinProduct | null {
  const priceAmount = parseAmount(product?.price?.amount);
  const compareAtAmount = parseAmount(product?.compareAtPrice?.amount);

  if (
    priceAmount <= 0 ||
    compareAtAmount <= 0 ||
    compareAtAmount <= priceAmount
  ) {
    return null;
  }

  const savingsAmount = compareAtAmount - priceAmount;
  const discountPercent = (savingsAmount / compareAtAmount) * 100;

  return {
    ...product,
    spinMeta: {
      priceAmount,
      compareAtAmount,
      discountPercent,
      savingsAmount,
    },
  };
}

function sortByBestDiscount(a: SpinProduct, b: SpinProduct) {
  if (b.spinMeta.discountPercent !== a.spinMeta.discountPercent) {
    return b.spinMeta.discountPercent - a.spinMeta.discountPercent;
  }

  if (b.spinMeta.savingsAmount !== a.spinMeta.savingsAmount) {
    return b.spinMeta.savingsAmount - a.spinMeta.savingsAmount;
  }

  if (a.spinMeta.priceAmount !== b.spinMeta.priceAmount) {
    return a.spinMeta.priceAmount - b.spinMeta.priceAmount;
  }

  return String(a.id).localeCompare(String(b.id));
}

function shuffleArray<T>(items: T[]) {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function formatCurrency(amount: number, currencyCode?: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${Math.round(amount)}`;
  }
}

function readRecord(raw: string | null): DailyRecord | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as DailyRecord;
    if (!parsed?.dateKey || !parsed?.firstWinnerProductId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function LuckySpin() {
  const navigate = useNavigateWithTransition();
  const { getItem, setItem } = useAsyncStorage();
  const [phase, setPhase] = useState<SpinPhase>("loading");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [activeWinner, setActiveWinner] = useState<SpinProduct | null>(null);
  const [dailyRecord, setDailyRecord] = useState<DailyRecord | null>(null);
  const [storageReady, setStorageReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const boardSeedRef = useRef(Math.random());

  const {
    products: rawProducts,
    loading,
    error,
  } = useProductSearch({
    query: SPIN_QUERY,
    first: 100,
    fetchPolicy: "network-only",
  });

  const products = rawProducts ?? [];

  const eligibleProducts = useMemo<SpinProduct[]>(() => {
    return products
      .map(normalizeProduct)
      .filter((product): product is SpinProduct => product !== null)
      .sort(sortByBestDiscount);
  }, [products]);

  const firstWinner = eligibleProducts[0] ?? null;
  const secondWinner = useMemo(() => {
    if (!firstWinner) return null;
    return (
      eligibleProducts.find((product) => product.id !== firstWinner.id) ?? null
    );
  }, [eligibleProducts, firstWinner]);

  const boardProducts = useMemo(() => {
    const mustInclude = [firstWinner, secondWinner].filter(
      (product): product is SpinProduct => product !== null,
    );

    const usedIds = new Set(mustInclude.map((product) => product.id));

    const fillerDiscounted = eligibleProducts.filter(
      (product) => !usedIds.has(product.id),
    );
    fillerDiscounted.forEach((product) => usedIds.add(product.id));
    const fallbackProducts: SpinProduct[] = products
      .filter((product) => !usedIds.has(product.id))
      .map(normalizeProduct)
      .filter((product): product is SpinProduct => product !== null);
    const merged = [
      ...mustInclude,
      ...fillerDiscounted,
      ...fallbackProducts,
    ].slice(0, BOARD_SIZE);

    const shuffled = shuffleArray(merged).slice(0, BOARD_SIZE);

    if (shuffled.length < BOARD_SIZE) {
      return shuffled;
    }

    const offset = Math.floor(boardSeedRef.current * BOARD_SIZE) % BOARD_SIZE;
    return shuffled.map(
      (_, index) => shuffled[(index + offset) % shuffled.length],
    );
  }, [eligibleProducts, firstWinner, products, secondWinner]);

  const firstWinnerIndex = useMemo(() => {
    if (!firstWinner) return -1;
    return boardProducts.findIndex((product) => product.id === firstWinner.id);
  }, [boardProducts, firstWinner]);

  const secondWinnerIndex = useMemo(() => {
    if (!secondWinner) return -1;
    return boardProducts.findIndex((product) => product.id === secondWinner.id);
  }, [boardProducts, secondWinner]);

  const restoreStateFromRecord = useCallback(
    (record: DailyRecord | null) => {
      if (!record || record.dateKey !== getTodayKey()) {
        setDailyRecord(null);
        setActiveWinner(null);
        return false;
      }

      setDailyRecord(record);

      const resolvedFirst =
        eligibleProducts.find(
          (product) => product.id === record.firstWinnerProductId,
        ) || firstWinner;
      const resolvedSecond =
        eligibleProducts.find(
          (product) => product.id === record.secondWinnerProductId,
        ) || secondWinner;

      if (record.usedSecondSpin) {
        setActiveWinner(resolvedSecond ?? resolvedFirst ?? null);
        setPhase("locked");
      } else {
        setActiveWinner(resolvedFirst ?? null);
        setPhase("first-shown");
      }

      return true;
    },
    [eligibleProducts, firstWinner, secondWinner],
  );

  useEffect(() => {
    let mounted = true;

    async function loadRecord() {
      try {
        const raw = await getItem({ key: STORAGE_KEY });
        if (!mounted) return;
        const record = readRecord(raw);
        setDailyRecord(record);
      } catch {
        if (!mounted) return;
        setStorageError("We couldn't restore your daily spin history.");
      } finally {
        if (mounted) setStorageReady(true);
      }
    }

    loadRecord();

    return () => {
      mounted = false;
    };
  }, [getItem]);

  useEffect(() => {
    if (!storageReady) return;

    if (loading) {
      setPhase("loading");
      return;
    }

    if (error || storageError) {
      setPhase("error");
      return;
    }

    if (!eligibleProducts.length || !firstWinner || firstWinnerIndex < 0) {
      setPhase("empty");
      return;
    }

    const restored = restoreStateFromRecord(dailyRecord);
    if (!restored) {
      setPhase("ready");
    }
  }, [
    dailyRecord,
    error,
    eligibleProducts.length,
    firstWinner,
    firstWinnerIndex,
    loading,
    restoreStateFromRecord,
    storageError,
    storageReady,
  ]);

  const runSpinAnimation = useCallback(async (targetIndex: number) => {
    const loops = BOARD_SIZE * 3 + targetIndex;

    for (let step = 0; step <= loops; step += 1) {
      const nextIndex = step % BOARD_SIZE;
      setHighlightedIndex(nextIndex);
      const progress = step / loops;
      const delay = 70 + Math.round(progress * 120);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }, []);

  const persistRecord = useCallback(
    async (record: DailyRecord) => {
      await setItem({
        key: STORAGE_KEY,
        value: JSON.stringify(record),
      });
      setDailyRecord(record);
    },
    [setItem],
  );

  const handleSpin = useCallback(async () => {
    if (!firstWinner || firstWinnerIndex < 0 || phase !== "ready") return;

    setPhase("spinning-first");
    setActiveWinner(null);

    await runSpinAnimation(firstWinnerIndex);

    const record: DailyRecord = {
      dateKey: getTodayKey(),
      firstWinnerProductId: String(firstWinner.id),
      usedSecondSpin: false,
      completedAt: new Date().toISOString(),
    };

    await persistRecord(record);
    setActiveWinner(firstWinner);
    setPhase("first-shown");
  }, [firstWinner, firstWinnerIndex, persistRecord, phase, runSpinAnimation]);

  const handleSecondSpin = useCallback(async () => {
    if (
      !secondWinner ||
      secondWinnerIndex < 0 ||
      phase !== "first-shown" ||
      !dailyRecord
    ) {
      return;
    }

    setPhase("spinning-second");

    await runSpinAnimation(secondWinnerIndex);

    const updatedRecord: DailyRecord = {
      ...dailyRecord,
      secondWinnerProductId: String(secondWinner.id),
      usedSecondSpin: true,
      completedAt: new Date().toISOString(),
    };

    await persistRecord(updatedRecord);
    setActiveWinner(secondWinner);
    setPhase("locked");
  }, [
    dailyRecord,
    persistRecord,
    phase,
    runSpinAnimation,
    secondWinner,
    secondWinnerIndex,
  ]);

  const handleGoHome = () => navigate("/main");

  const canSpin = phase === "ready";
  const canSecondSpin = phase === "first-shown" && Boolean(secondWinner);
  const isLocked = phase === "locked";
  const winnerBadgeLabel =
    phase === "locked" && activeWinner?.id === secondWinner?.id
      ? "Your alternate pick"
      : "Best deal today";

  const subtitle = useMemo(() => {
    if (phase === "ready") {
      return "We found today's strongest markdown. Spin to reveal your best product deal.";
    }

    if (phase === "first-shown") {
      return secondWinner
        ? "Nice pick. You can still try one more time today to reveal a different discounted product."
        : "This is the only discounted winner available today.";
    }

    if (phase === "locked") {
      return "Your daily Lucky Spin is complete. Come back tomorrow for a fresh deal.";
    }

    if (phase === "empty") {
      return "No discounted products are available right now. Please check again later.";
    }

    if (phase === "error") {
      return "Something went wrong while loading today's deals.";
    }

    return "Finding the smoothest shopping reward for your next lucky moment.";
  }, [phase, secondWinner]);

  return (
    <SafeArea className="lucky-spin-root">
      <div className="lucky-spin-glow lucky-spin-glow--top" aria-hidden />
      <div className="lucky-spin-glow lucky-spin-glow--bottom" aria-hidden />

      <header className="lucky-spin-header">
        <div className="lucky-spin-logo">
          Lucky<span>Spinner</span>
        </div>
        <div className="lucky-spin-status">
          {isLocked ? <Lock size={14} /> : <Sparkles size={14} />}
          <span>{isLocked ? "Come back tomorrow" : "1 spin today"}</span>
        </div>
      </header>

      <main className="lucky-spin-main">
        <section className="lucky-spin-hero">
          <Badge>Daily Lucky Spin</Badge>
          <h1>Spin for your best deal</h1>
          <p>{subtitle}</p>
        </section>

        <section className="lucky-spin-board-wrap">
          <div className="lucky-spin-board-shell">
            <div className="lucky-spin-board">
              {Array.from({ length: 9 }).map((_, gridIndex) => {
                const perimeterIndex = BOARD_ORDER.indexOf(
                  gridIndex as (typeof BOARD_ORDER)[number],
                );
                const product =
                  perimeterIndex >= 0
                    ? (boardProducts[perimeterIndex] ?? null)
                    : null;
                const isCenter = gridIndex === 4;
                const isHighlighted =
                  perimeterIndex >= 0 && highlightedIndex === perimeterIndex;
                const isWinner = Boolean(
                  activeWinner && product && activeWinner.id === product.id,
                );

                if (isCenter) {
                  return (
                    <div key={gridIndex} className="lucky-spin-center">
                      <div className="lucky-spin-center-ring">
                        <Gift size={22} />
                      </div>
                      <div className="lucky-spin-center-copy">
                        <strong>
                          {phase === "spinning-first" ||
                          phase === "spinning-second"
                            ? "Spinning..."
                            : activeWinner
                              ? `-${Math.round(activeWinner.spinMeta.discountPercent)}%`
                              : "Tap to spin"}
                        </strong>
                        <span>
                          {activeWinner
                            ? "Top discount"
                            : "8 curated products around today's winner"}
                        </span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={gridIndex}
                    className={`lucky-spin-tile${isHighlighted ? " is-highlighted" : ""}${
                      isWinner ? " is-winner" : ""
                    }${!product ? " is-placeholder" : ""}`}
                  >
                    {product ? (
                      <>
                        <div className="lucky-spin-tile-media">
                          {product.featuredImage?.url ? (
                            <Image
                              src={product.featuredImage.url}
                              alt={product.title}
                            />
                          ) : (
                            <div className="lucky-spin-fallback-image">
                              <Gift size={18} />
                            </div>
                          )}
                        </div>
                        <div className="lucky-spin-tile-info">
                          <span className="lucky-spin-tile-title">
                            {product.title}
                          </span>
                          <span className="lucky-spin-tile-discount">
                            -{Math.round(product.spinMeta.discountPercent)}%
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="lucky-spin-placeholder-dot" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lucky-spin-result-panel">
          {phase === "loading" && (
            <div className="lucky-spin-loading-card">
              <Skeleton></Skeleton>
            </div>
          )}

          {phase === "error" && (
            <div className="lucky-spin-state-card">
              <div className="lucky-spin-state-icon">
                <RefreshCw size={18} />
              </div>
              <h2>Unable to load lucky deals</h2>
              <p>
                {error?.message || storageError || "Please try again shortly."}
              </p>
            </div>
          )}

          {phase === "empty" && (
            <div className="lucky-spin-state-card">
              <div className="lucky-spin-state-icon">
                <Gift size={18} />
              </div>
              <h2>No discounted products yet</h2>
              <p>
                We couldn't find a valid compare-at deal in the current product
                feed.
              </p>
            </div>
          )}

          {activeWinner && (phase === "first-shown" || phase === "locked") && (
            <div className="lucky-spin-winner-card">
              <div className="lucky-spin-winner-head">
                <Badge>{winnerBadgeLabel}</Badge>
                <div className="lucky-spin-pricing">
                  <strong>
                    {formatCurrency(
                      activeWinner.spinMeta.priceAmount,
                      activeWinner.price?.currencyCode,
                    )}
                  </strong>
                  <span>
                    {formatCurrency(
                      activeWinner.spinMeta.compareAtAmount,
                      activeWinner.compareAtPrice?.currencyCode,
                    )}
                  </span>
                </div>
              </div>
              <div className="lucky-spin-winner-copy">
                <h2>{activeWinner.title}</h2>
                <p>
                  Save {Math.round(activeWinner.spinMeta.discountPercent)}%
                  today with a curated discounted pick from your Lucky Spin.
                </p>
              </div>
              <div className="lucky-spin-card-frame">
                <ProductCard product={activeWinner} variant="priceOverlay" />
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="lucky-spin-footer">
        {canSpin && (
          <Button className="lucky-spin-primary-btn" onClick={handleSpin}>
            Spin now
          </Button>
        )}

        {canSecondSpin && (
          <Button className="lucky-spin-primary-btn" onClick={handleSecondSpin}>
            Find another product
          </Button>
        )}

        {(isLocked || phase === "error" || phase === "empty") && (
          <Button className="lucky-spin-primary-btn" onClick={handleGoHome}>
            Back to home
          </Button>
        )}

        {!secondWinner && phase === "first-shown" && (
          <button className="lucky-spin-secondary-btn" onClick={handleGoHome}>
            Back to home
          </button>
        )}
      </footer>
    </SafeArea>
  );
}
