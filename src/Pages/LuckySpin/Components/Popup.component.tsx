import { Badge, Button, Image } from "@shopify/shop-minis-react";
import { X } from "lucide-react";
import { SpinProduct } from "../Types/LuckySpin.type";
import { formatCurrency } from "../Utils/Utils";

type PopupProps = {
  open: boolean;
  product: SpinProduct | null;
  onClose: () => void;
  onBuy: () => void;
};

export function Popup({ open, product, onClose, onBuy }: PopupProps) {
  if (!open || !product) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onBuy();
  };

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="lucky-spin-popup" onClick={handleBackdropClick}>
      <div className="lucky-spin-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="lucky-spin-popup-close" onClick={handleCloseClick}>
          <X size={20} />
        </button>

        <Badge className="lucky-spin-popup-badge">Congratulations!</Badge>

        <h2 className="lucky-spin-popup-title">Top Discount Winner</h2>

        <div className="lucky-spin-popup-product">
          <div className="lucky-spin-popup-image">
            {product.featuredImage?.url ? (
              <Image src={product.featuredImage.url} alt={product.title} />
            ) : (
              <div className="lucky-spin-popup-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}
          </div>

          <div className="lucky-spin-popup-info">
            <h3 className="lucky-spin-popup-product-title">{product.title}</h3>

            <div className="lucky-spin-popup-pricing">
              <div className="lucky-spin-popup-price">
                {formatCurrency(product.spinMeta.priceAmount, product.price?.currencyCode)}
              </div>
              <div className="lucky-spin-popup-compare">
                {formatCurrency(product.spinMeta.compareAtAmount, product.compareAtPrice?.currencyCode)}
              </div>
              <div className="lucky-spin-popup-discount">
                -{Math.round(product.spinMeta.discountPercent)}%
              </div>
            </div>

            <p className="lucky-spin-popup-savings">
              Save {formatCurrency(product.spinMeta.savingsAmount, product.price?.currencyCode)} today!
            </p>
          </div>
        </div>

        <Button className="lucky-spin-popup-btn" onClick={handleBuyClick}>
          Mua ngay
        </Button>
      </div>
    </div>
  );
}