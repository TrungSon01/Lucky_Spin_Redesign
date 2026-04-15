import "./LuckySpin.css";
import { ProductCard, useShopNavigation } from "@shopify/shop-minis-react";
import { House } from "lucide-react";
import useLuckySpin from "./Hooks/useLuckySpin.hook";

export default function LuckySpin() {
  const {
    BORDER_PATH,
    CENTER_CELL,
    currentHighlight,
    displayProducts,
    handleSpin,
    isSpinning,
    navigateWithTransition,
    setWinnerIndex,
    setWinnerProduct,
    winnerIndex,
    winnerProduct,
    // confirmState,
    // exitFlowAndGoHome,
  } = useLuckySpin();
  const { navigateToProduct } = useShopNavigation();

  return (
    <div className="lucky-spin-container">
      <div className="fixed top-5 left-5 scale-150 ">
        <House color="yellow" onClick={() => navigateWithTransition("/")} />
      </div>

      {/* <ConfirmPopup
        isOpen={confirmState.isOpen}
        message={confirmState.options.message}
        onConfirm={confirmState.handleConfirm}
        onCancel={confirmState.handleCancel}
      /> */}
      <div className="grid-wrapper">
        <div className="lucky-grid">
          {Array.from({ length: 9 }).map((_, gridIdx) => {
            if (gridIdx === CENTER_CELL) {
              return <div key={gridIdx} className="lucky-cell empty-cell" />;
            }

            const prodIndex = BORDER_PATH.indexOf(gridIdx);
            const item = displayProducts[prodIndex];

            const isActive = currentHighlight === gridIdx;
            const isWinner = winnerIndex === gridIdx && !isSpinning;

            return (
              <div
                key={gridIdx}
                className={`lucky-cell ${isActive ? "active" : ""} ${
                  isWinner ? "winner" : ""
                }`}
              >
                {item?.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item?.shortId || "product"}
                    className="product-image"
                  />
                ) : (
                  <span className="product-id">{item?.shortId || "N/A"}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="spin-controls">
        <button
          className="spin-button"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : "Spin Now"}
        </button>
      </div>

      {/*  MODAL */}
      {winnerProduct && !isSpinning && (
        <div
          className="winner-modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setWinnerProduct(null);
              setWinnerIndex(null);
            }
          }}
        >
          <div className="winner-content">
            <div
              onClick={() =>
                navigateWithTransition(`/product/${winnerProduct.id}`)
              }
              style={{ cursor: "pointer" }}
            >
              <ProductCard product={winnerProduct} />
            </div>

            <button
              className="close-button"
              onClick={() => {
                navigateToProduct({ productId: winnerProduct.id });
                setWinnerProduct(null);
                setWinnerIndex(null);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
