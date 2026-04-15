import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import { useListProductStore } from "../../../zustand/useListProductZustand";
import { useEffect, useMemo, useRef, useState } from "react";
// import { useConfirm } from "./useConfirm.hook";

const getId = (gid: string) => gid.split("/").pop() || "";

const BORDER_PATH = [0, 1, 2, 5, 8, 7, 6, 3];
const CENTER_CELL = 4;

const shuffle = <T>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export default function useLuckySpin() {
  const products = useListProductStore((state) => state.products);
  const navigateWithTransition = useNavigateWithTransition();

  const [isSpinning, setIsSpinning] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [currentHighlight, setCurrentHighlight] = useState<number>(0);
  const [winnerProduct, setWinnerProduct] = useState<any | null>(null);
  //popup
  // const { isOpen, options, confirm, handleConfirm, handleCancel } =
  //   useConfirm();

  //popup
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const displayProducts = useMemo(() => {
    if (products.length === 0) {
      return Array(8).fill(null);
    }

    return shuffle(products)
      .slice(0, 8)
      .map((item) => ({
        ...item,
        shortId: getId(item.id),
        imageUrl: item.featuredImage?.url || "",
      }));
  }, [products]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setIsSpinning(true);
    setWinnerIndex(null);
    setWinnerProduct(null);

    const winnerPathIndex = Math.floor(Math.random() * BORDER_PATH.length);
    const winnerGridIndex = BORDER_PATH[winnerPathIndex];

    const randomLoops = Math.floor(Math.random() * 3) + 3;

    const sequence: number[] = [];

    for (let i = 0; i < randomLoops; i++) {
      sequence.push(...BORDER_PATH);
    }

    let current = 0;
    while (current !== winnerPathIndex) {
      sequence.push(BORDER_PATH[current]);
      current = (current + 1) % BORDER_PATH.length;
    }

    sequence.push(winnerGridIndex);

    const totalSteps = sequence.length;
    const TOTAL_DURATION = 7000;
    const avgDelay = TOTAL_DURATION / totalSteps;

    let step = 0;
    let cumulativeTime = 0;

    const run = () => {
      if (step < totalSteps) {
        const cellIndex = sequence[step];
        setCurrentHighlight(cellIndex);

        const progress = step / totalSteps;
        const easeMultiplier = 0.4 + 1.2 * Math.pow(progress, 3);
        let delay = avgDelay * easeMultiplier;

        if (cumulativeTime + delay > TOTAL_DURATION) {
          delay = TOTAL_DURATION - cumulativeTime;
        }

        cumulativeTime += delay;

        const t = setTimeout(run, Math.max(10, delay));
        timeoutsRef.current.push(t);
        step++;
      } else {
        setCurrentHighlight(winnerGridIndex);
        setWinnerIndex(winnerGridIndex);

        const prodIndex = BORDER_PATH.indexOf(winnerGridIndex);
        const selectedProduct = displayProducts[prodIndex];

        setWinnerProduct(selectedProduct);
        setIsSpinning(false);
        timeoutsRef.current = [];
      }
    };

    run();
  };

  // const exitFlowAndGoHome = async () => {
  //   const ok = await confirm({
  //     message: "Are you sure to go back?",
  //   });

  //   if (!ok) return;

  //   navigateWithTransition("/");
  // };

  return {
    BORDER_PATH,
    CENTER_CELL,
    currentHighlight,
    displayProducts,
    winnerIndex,
    winnerProduct,
    handleSpin,
    isSpinning,
    navigateWithTransition,
    setWinnerIndex,
    setWinnerProduct,
    // exitFlowAndGoHome,
    // confirmState: {
    //   isOpen,
    //   options,
    //   handleCancel,
    //   handleConfirm,
    // },
  };
}
