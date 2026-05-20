import { Button, Image } from "@shopify/shop-minis-react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { Gift } from "lucide-react";
import { SpinProduct } from "../Types/LuckySpin.type";
import { formatCurrency } from "../Utils/Utils";

type PopupProps = {
  open: boolean;
  show: boolean;
  product: SpinProduct | null;
  onClose: () => void;
  onBuy: () => void;
};

export function Popup({ open, show, product, onClose, onBuy }: PopupProps) {
  if (!open || !product) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onBuy();
  };

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  const currencyCode =
    product.price?.currencyCode ||
    product.compareAtPrice?.currencyCode ||
    "USD";
  const salePrice = formatCurrency(product.spinMeta.priceAmount, currencyCode);
  const originalPrice = formatCurrency(
    product.spinMeta.compareAtAmount,
    currencyCode,
  );
  const discountPercent = Math.round(product.spinMeta.discountPercent);
  const description = (
    product as SpinProduct & { description?: string }
  ).description?.trim();

  return (
    <div
      className={`lsp-backdrop${show ? " is-visible" : " is-hiding"}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`lsp-sheet${show ? " is-visible" : " is-hiding"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lsp-handle" />

        <button
          className="lsp-close"
          onClick={handleCloseClick}
          aria-label="Close"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {/* Celebration header */}
        <div className="lsp-celebration">
          <div className="lsp-celebration-icon" aria-hidden="true">
            <div className="lsp-celebration-icon-bg" />
            <div className="lsp-celebration-icon-inner">
              <Gift size={24} strokeWidth={2} />
            </div>
          </div>
          <div>
            <div className="lsp-eyebrow-pill">
              <div className="lsp-eyebrow-dot" />
              <p className="lsp-eyebrow">Lucky deal of the day</p>
            </div>
            <h2 className="lsp-title">Jackpot Deal Unlocked</h2>
          </div>
        </div>

        {/* Product card */}
        <div className="lsp-card">
          <div className="lsp-image-wrap">
            {product.featuredImage?.url ? (
              <>
                <Image src={product.featuredImage.url} alt={product.title} />
                <span className="lsp-image-badge">SALE</span>
              </>
            ) : (
              <div className="lsp-image-placeholder">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}
          </div>

          <div className="lsp-product-info">
            <h3 className="lsp-product-name">{product.title}</h3>

            {description && <p className="lsp-description">{description}</p>}

            <div className="lsp-pricing">
              <span className="lsp-sale-price">{salePrice}</span>
              <span className="lsp-original-price">{originalPrice}</span>
              <span className="lsp-discount-pill">−{discountPercent}%</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="lsp-actions">
          <Button className="lsp-buy-btn" onClick={handleBuyClick}>
            <span className="lsp-buy-btn-icon">
              <Sparkles size={16} strokeWidth={2} />
            </span>
            Buy this
            <span className="lsp-buy-btn-icon">
              <ArrowRight size={16} strokeWidth={2.5} />
            </span>
          </Button>
          <button className="lsp-skip-btn" onClick={handleCloseClick}>
            Maybe later
          </button>
        </div>

        <div className="lsp-safe-area" />
      </div>
    </div>
  );
}
