import "./LuckySpin.css";
import {
  Badge,
  Button,
  SafeArea,
  useNavigateWithTransition,
  useShopNavigation,
} from "@shopify/shop-minis-react";
import { Lock, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Popup } from "./Components/Popup.component";
import { SpinBoard } from "./Components/SpinBoard.component";
import { SpinResultPanel } from "./Components/SpinResultPanel.component";
import { useLuckySpin } from "./Hooks/useLuckySpin";

export default function LuckySpin() {
  const navigate = useNavigateWithTransition();
  const { navigateToProduct } = useShopNavigation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    handleSecondSpin,
  } = useLuckySpin();

  useEffect(() => {
    const previousPhase = previousPhaseRef.current;

    if (
      phase === "first-shown" &&
      activeWinner &&
      previousPhase === "spinning-first"
    ) {
      setIsPopupOpen(true);
    }

    if (phase !== "first-shown") {
      setIsPopupOpen(false);
    }

    previousPhaseRef.current = phase;
  }, [activeWinner, phase]);

  const handleGoHome = () => navigate("/main");
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleBuyWinner = () => {
    if (!activeWinner?.id) return;
    setIsPopupOpen(false);
    navigateToProduct({ productId: String(activeWinner.id) });
  };

  const canSecondSpin = phase === "first-shown" && Boolean(secondWinner);
  const isLocked = phase === "locked";

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

      <Popup
        open={isPopupOpen}
        product={activeWinner}
        onClose={handleClosePopup}
        onBuy={handleBuyWinner}
      />
    </SafeArea>
  );
}
