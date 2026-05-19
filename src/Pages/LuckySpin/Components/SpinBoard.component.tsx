import { Image } from "@shopify/shop-minis-react";
import { Gift, Sparkles } from "lucide-react";
import { BOARD_ORDER } from "../Constants/Constants";
import { SpinPhase, SpinProduct } from "../Types/LuckySpin.type";

type SpinBoardProps = {
  boardProducts: SpinProduct[];
  highlightedIndex: number | null;
  activeWinner: SpinProduct | null;
  phase: SpinPhase;
  onSpin: () => void;
};

export function SpinBoard({
  boardProducts,
  highlightedIndex,
  activeWinner,
  phase,
  onSpin,
}: SpinBoardProps) {
  return (
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
              const isSpinning =
                phase === "spinning-first" || phase === "spinning-second";
              const canSpin = phase === "ready" || phase === "first-shown";
              const isDisabled = !canSpin || isSpinning;
              const hasWinner = activeWinner != null;

              return (
                <button
                  key={gridIndex}
                  type="button"
                  className={`lucky-spin-center${canSpin ? " is-clickable" : ""}${
                    isSpinning ? " is-spinning" : ""
                  }`}
                  onClick={onSpin}
                  disabled={isDisabled}
                >
                  <div className="lucky-spin-center-ring">
                    {isSpinning ? (
                      <div className="lucky-spin-center-loader" />
                    ) : (
                      <Sparkles size={22} />
                    )}
                  </div>
                  <div className="lucky-spin-center-copy">
                    <strong>
                      {isSpinning
                        ? "Spinning..."
                        : phase === "first-shown"
                          ? "Spin again"
                          : hasWinner
                            ? `-${Math.round(activeWinner.spinMeta.discountPercent)}%`
                            : "Spin now"}
                    </strong>
                    <span>
                      {phase === "first-shown"
                        ? "Tap to reveal one more deal"
                        : hasWinner
                          ? "Top discount"
                          : "Tap to reveal your deal"}
                    </span>
                  </div>
                </button>
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
  );
}
