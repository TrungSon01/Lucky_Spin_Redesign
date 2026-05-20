import { useAsyncStorage, useProductSearch } from "@shopify/shop-minis-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BOARD_SIZE, SPIN_QUERY, STORAGE_KEY } from "../Constants/Constants";
import {
  DailyRecord,
  SpinPhase,
  SpinProduct,
  SpinVoucher,
} from "../Types/LuckySpin.type";
import {
  generateVoucherCode,
  getTodayKey,
  normalizeProduct,
  readRecord,
  shuffleArray,
} from "../Utils/Utils";
import { useLocalZustand } from "../../../zustand/app.useLocalZustand";
function buildVoucher(product: SpinProduct): SpinVoucher {
  return {
    code: generateVoucherCode(product),
    percent: Math.round(product.spinMeta.discountPercent),
    productId: String(product.id),
  };
}

export function useLuckySpin() {
  const { getItem, setItem } = useAsyncStorage();

  const [phase, setPhase] = useState<SpinPhase>("loading");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [activeWinner, setActiveWinner] = useState<SpinProduct | null>(null);
  const [activeVoucher, setActiveVoucher] = useState<SpinVoucher | null>(null);
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
    first: 50,
    fetchPolicy: "network-only",
  });

  const products = rawProducts ?? [];

  const eligibleProducts = useMemo<SpinProduct[]>(() => {
    return products
      .map(normalizeProduct)
      .filter((product): product is SpinProduct => product !== null);
  }, [products]);

  const shuffledEligibleProducts = useMemo(
    () => shuffleArray(eligibleProducts),
    [eligibleProducts],
  );

  const firstWinner = shuffledEligibleProducts[0] ?? null;
  const secondWinner = shuffledEligibleProducts[1] ?? null;

  const boardProducts = useMemo(() => {
    const mustInclude = [firstWinner, secondWinner].filter(
      (product): product is SpinProduct => product !== null,
    );

    const usedIds = new Set(mustInclude.map((product) => product.id));

    const fillerDiscounted = shuffledEligibleProducts.filter(
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

    if (shuffled.length < BOARD_SIZE) return shuffled;

    const offset = Math.floor(boardSeedRef.current * BOARD_SIZE) % BOARD_SIZE;
    return shuffled.map(
      (_, index) => shuffled[(index + offset) % shuffled.length],
    );
  }, [firstWinner, products, secondWinner, shuffledEligibleProducts]);

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
        setActiveVoucher(null);
        return false;
      }

      setDailyRecord(record);

      const resolvedFirst =
        eligibleProducts.find(
          (product) => product.id === record.firstWinnerProductId,
        ) ?? null;
      const resolvedSecond =
        eligibleProducts.find(
          (product) => product.id === record.secondWinnerProductId,
        ) ?? null;

      if (record.usedSecondSpin) {
        setActiveWinner(resolvedSecond ?? resolvedFirst ?? null);
        setActiveVoucher(record.secondVoucher ?? record.firstVoucher);
        setPhase("locked");
      } else {
        setActiveWinner(resolvedFirst ?? null);
        setActiveVoucher(record.firstVoucher);
        setPhase("first-shown");
      }

      return true;
    },
    [eligibleProducts],
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
    if (!restored) setPhase("ready");
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
    const loops = BOARD_SIZE * 4 + targetIndex;
    for (let step = 0; step <= loops; step += 1) {
      const nextIndex = step % BOARD_SIZE;
      setHighlightedIndex(nextIndex);
      const progress = step / loops;
      const easeOut = 1 - (1 - progress) * (1 - progress);
      const delay = 40 + Math.round(easeOut * 180);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }, []);

  const persistRecord = useCallback(
    async (record: DailyRecord) => {
      await setItem({ key: STORAGE_KEY, value: JSON.stringify(record) });
      setDailyRecord(record);
    },
    [setItem],
  );

  const handleSpin = useCallback(async () => {
    // First spin
    if (phase === "ready" && firstWinner && firstWinnerIndex >= 0) {
      setPhase("spinning-first");
      setActiveWinner(null);
      setActiveVoucher(null);
      await runSpinAnimation(firstWinnerIndex);
      // tăng round lên 1 đơn vị
      await setItem({
        key: "rounds_played",
        value: String(
          Number((await getItem({ key: "rounds_played" })) ?? "0") + 1,
        ),
      });
      useLocalZustand.setState((state) => ({
        state: {
          ...state.state,
          rounds_played: String(Number(state.state.rounds_played ?? "0") + 1),
        },
      }));
      const firstVoucher = buildVoucher(firstWinner);
      const record: DailyRecord = {
        dateKey: getTodayKey(),
        firstWinnerProductId: String(firstWinner.id),
        firstVoucher,
        usedSecondSpin: false,
        completedAt: new Date().toISOString(),
      };

      await persistRecord(record);
      setActiveWinner(firstWinner);
      setActiveVoucher(firstVoucher);
      setPhase("first-shown");
      return;
    }

    // Second spin
    if (
      phase === "first-shown" &&
      secondWinner &&
      secondWinnerIndex >= 0 &&
      dailyRecord
    ) {
      setPhase("spinning-second");
      await runSpinAnimation(secondWinnerIndex);

      const secondVoucher = buildVoucher(secondWinner);
      const updatedRecord: DailyRecord = {
        ...dailyRecord,
        secondWinnerProductId: String(secondWinner.id),
        secondVoucher,
        usedSecondSpin: true,
        completedAt: new Date().toISOString(),
      };
      // tăng round lên 1 đơn vị nếu người dùng sử dụng lượt quay thứ 2 đồng thời update zustand
      await setItem({
        key: "rounds_played",
        value: String(
          Number((await getItem({ key: "rounds_played" })) ?? "0") + 1,
        ),
      });
      useLocalZustand.setState((state) => ({
        state: {
          ...state.state,
          rounds_played: String(Number(state.state.rounds_played ?? "0") + 1),
        },
      }));
      // tăng day streak lên 1 đơn vị chỉ khi người dùng sử dụng vòng quay thứ 2
      await setItem({
        key: "current_streak",
        value: String(
          Number((await getItem({ key: "current_streak" })) ?? "0") + 1,
        ),
      });
      useLocalZustand.setState((state) => ({
        state: {
          ...state.state,
          current_streak: String(Number(state.state.current_streak ?? "0") + 1),
        },
      }));

      await persistRecord(updatedRecord);
      setActiveWinner(secondWinner);
      setActiveVoucher(secondVoucher);
      setPhase("locked");
    }
  }, [
    dailyRecord,
    firstWinner,
    firstWinnerIndex,
    persistRecord,
    phase,
    runSpinAnimation,
    secondWinner,
    secondWinnerIndex,
  ]);

  return {
    phase,
    highlightedIndex,
    activeWinner,
    activeVoucher,
    boardProducts,
    firstWinner,
    secondWinner,
    error,
    storageError,
    handleSpin,
  };
}
