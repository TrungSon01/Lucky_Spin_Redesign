import { Badge, ProductCard, Skeleton } from "@shopify/shop-minis-react";
import { Gift, RefreshCw } from "lucide-react";
import { SpinPhase, SpinProduct } from "../Types/LuckySpin.type";
import { formatCurrency } from "../Utils/Utils";

type SpinResultPanelProps = {
  phase: SpinPhase;
  activeWinner: SpinProduct | null;
  secondWinner: SpinProduct | null;
  error?: Error | null;
  storageError?: string | null;
};

export function SpinResultPanel({
  phase,
  activeWinner,
  secondWinner,
  error,
  storageError,
}: SpinResultPanelProps) {
  const winnerBadgeLabel =
    phase === "locked" && activeWinner?.id === secondWinner?.id
      ? "Your alternate pick"
      : "Best deal today";

  return (
    <section className="lucky-spin-result-panel">
      {phase === "loading" && (
        <div className="lucky-spin-loading-card">
          <Skeleton />
        </div>
      )}

      {phase === "error" && (
        <div className="lucky-spin-state-card">
          <div className="lucky-spin-state-icon">
            <RefreshCw size={18} />
          </div>
          <h2>Unable to load lucky deals</h2>
          <p>{error?.message || storageError || "Please try again shortly."}</p>
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
              Save {Math.round(activeWinner.spinMeta.discountPercent)}% today
              with a curated discounted pick from your Lucky Spin.
            </p>
          </div>
          <div className="lucky-spin-card-frame">
            <ProductCard product={activeWinner} variant="priceOverlay" />
          </div>
        </div>
      )}
    </section>
  );
}
