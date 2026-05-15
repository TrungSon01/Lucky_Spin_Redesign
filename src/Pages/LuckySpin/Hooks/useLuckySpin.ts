import { useAsyncStorage, useProductSearch } from "@shopify/shop-minis-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BOARD_SIZE, SPIN_QUERY, STORAGE_KEY } from "../Constants/Constants";
import { DailyRecord, SpinPhase, SpinProduct } from "../Types/LuckySpin.type";
import {
  getTodayKey,
  normalizeProduct,
  readRecord,
  shuffleArray,
  sortByBestDiscount,
} from "../Utils/Utils";

export function useLuckySpin() {
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

    if (shuffled.length < BOARD_SIZE) return shuffled;

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
      await setItem({ key: STORAGE_KEY, value: JSON.stringify(record) });
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
    )
      return;

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

  return {
    phase,
    highlightedIndex,
    activeWinner,
    boardProducts,
    firstWinner,
    secondWinner,
    error,
    storageError,
    handleSpin,
    handleSecondSpin,
  };
}
