import "./LuckySpin.css";
import {
  Button,
  SafeArea,
  useNavigateWithTransition,
  useShopNavigation,
} from "@shopify/shop-minis-react";
import { Lock, Sparkles } from "lucide-react";
import { useAsyncStorage } from "@shopify/shop-minis-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Popup } from "./Components/Popup.component";
import { SpinBoard } from "./Components/SpinBoard.component";
import { SpinResultPanel } from "./Components/SpinResultPanel.component";
import { useLuckySpin } from "./Hooks/useLuckySpin";
import { useLocalZustand } from "../../zustand/app.useLocalZustand";

export default function LuckySpin() {
  const navigate = useNavigateWithTransition();
  const { setItem, getItem } = useAsyncStorage();
  const { navigateToProduct } = useShopNavigation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const popupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousPhaseRef = useRef<string | null>(null);

  const {
    phase,
    highlightedIndex,
    activeWinner,
    boardProducts,
    secondWinner,
    error,
    storageError,
    handleSpin,
  } = useLuckySpin();

  useEffect(() => {
    const previousPhase = previousPhaseRef.current;
    const shouldShowPopup =
      (phase === "first-shown" && previousPhase === "spinning-first") ||
      (phase === "locked" && previousPhase === "spinning-second");

    if (shouldShowPopup && activeWinner) {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }

      setIsPopupOpen(true);
      popupTimerRef.current = setTimeout(() => {
        setShowPopup(true);
      }, 20);
    }

    previousPhaseRef.current = phase;

    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
    };
  }, [activeWinner, phase]);

  useEffect(() => {
    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleGoHome = () => navigate("/main");

  const handleClosePopup = () => {
    setShowPopup(false);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => setIsPopupOpen(false), 320);
  };

  const handleBuyWinner = async () => {
    await setItem({
      key: "achievement_first_purchase",
      value: String(
        (await Number(getItem({ key: "achievement_first_purchase" }))) ?? 0 + 1,
      ),
    });
    // cập nhật zustand
    useLocalZustand.setState((state) => ({
      state: {
        ...state.state,
        achievement_first_purchase: String(
          Number(state.state.achievement_first_purchase ?? "0") + 1,
        ),
      },
    }));

    if (!activeWinner?.id) return;
    setShowPopup(false);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setIsPopupOpen(false);
      navigateToProduct({ productId: String(activeWinner.id) });
    }, 320);
  };

  const isLocked = phase === "locked";

  const subtitle = useMemo(() => {
    if (phase === "ready") {
      return "We found today's strongest markdown. Spin to reveal your best product deal.";
    }
    if (phase === "first-shown") {
      return secondWinner
        ? ""
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
          <span>{isLocked ? "Come back tomorrow" : "2 spins today"}</span>
        </div>
      </header>

      <main className="lucky-spin-main">
        <section className="lucky-spin-hero">
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-yellow-400">
            <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            <span>Daily Lucky Spin</span>
          </span>
          <h1>Spin for your best deal</h1>

          <p>{subtitle}</p>
        </section>

        <SpinBoard
          boardProducts={boardProducts}
          highlightedIndex={highlightedIndex}
          activeWinner={activeWinner}
          phase={phase}
          onSpin={handleSpin}
        />

        <SpinResultPanel
          phase={phase}
          activeWinner={activeWinner}
          secondWinner={secondWinner}
          error={error}
          storageError={storageError}
        />
      </main>

      <footer className="lucky-spin-footer">
        {(phase === "error" ||
          phase === "empty" ||
          (!secondWinner && phase === "first-shown")) && (
          <Button className="lucky-spin-primary-btn" onClick={handleGoHome}>
            Back to home
          </Button>
        )}
      </footer>

      <Popup
        open={isPopupOpen}
        show={showPopup}
        product={activeWinner}
        onClose={handleClosePopup}
        onBuy={handleBuyWinner}
      />
    </SafeArea>
  );
}
