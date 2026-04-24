import {
  useNavigateWithTransition,
  ProductCard,
  Product,
  useSavedProductsActions,
} from "@shopify/shop-minis-react";
import { RefreshCw } from "lucide-react";
import "./Result.template.css";

export interface ResultTemplateProps {
  category:
    | "beauty"
    | "electronic"
    | "accessory"
    | "clothing"
    | "homeEssential";
  categoryName: string;
  themeClass: string;
  badgeText?: string;
  appName?: string;
  products: Product[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  resetAnswers: () => void;
}

export default function ResultTemplate({
  category,
  categoryName,
  themeClass,
  badgeText = "Picks",
  appName = "LuckySpinner",
  products = [],
  isLoading = false,
  error = null,
  onRetry,
  resetAnswers,
}: ResultTemplateProps) {
  const navigate = useNavigateWithTransition();
  const { saveProduct, unsaveProduct } = useSavedProductsActions();
  const handleStartOver = () => {
    resetAnswers();
    navigate(`/questions/${category}`);
  };

  const handleRetry = () => {
    if (onRetry) onRetry();
  };

  const isEmpty = !isLoading && !error && products.length === 0;

  const nameParts = appName.split(/(?=[A-Z])/);

  return (
    <div className={`result-root ${themeClass}`.trim()}>
      {/* Ambient glows */}
      <div className="result-glows" aria-hidden>
        <div className="result-glow-top" />
        <div className="result-glow-bottom" />
      </div>

      {/* Header */}
      <header className="result-header">
        <div className="result-logo">
          <span className="result-logo-white">{nameParts[0]}</span>
          {nameParts.slice(1).map((part, i) => (
            <span key={i} className="result-logo-accent">
              {part}
            </span>
          ))}
        </div>
        <div className="result-live-badge" role="status" aria-label="Live now">
          <div className="result-live-dot" />
          <span className="result-live-text">Live now</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="result-hero">
        <div className="result-hero-content">
          <div className="result-badge">{badgeText}</div>
          <h1 className="result-title">
            Your {categoryName} {badgeText}
          </h1>
          <p className="result-subtitle">
            Based on your answers, we found the best matches for you
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="result-main">
        {isLoading && <ResultSkeleton />}

        {error && !isLoading && (
          <ResultError
            message={error.message || "Something went wrong"}
            onRetry={handleRetry}
          />
        )}

        {isEmpty && !isLoading && !error && (
          <ResultEmpty
            message="No products match your preferences. Try adjusting your quiz answers!"
            onStartOver={handleStartOver}
          />
        )}

        {!isLoading && !error && !isEmpty && (
          <div className="result-grid">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="result-card"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="result-product-card">
                  <ProductCard
                    variant="priceOverlay"
                    product={product}
                    onFavoriteToggled={async () => {
                      try {
                        await saveProduct({
                          productId: product.id,
                          shopId: product.shop.id,
                          productVariantId: product.defaultVariantId,
                        });
                      } catch (error) {
                        await unsaveProduct({
                          productId: product.id,
                          shopId: product.shop.id,
                          productVariantId: product.defaultVariantId,
                        });
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <div className="result-footer">
        <button className="result-start-over" onClick={handleStartOver}>
          <RefreshCw size={16} />
          <span>Start Over</span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function ResultSkeleton() {
  return (
    <div className="result-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="result-card">
          <div className="result-skeleton-image" />
          <div className="result-skeleton-info">
            <div className="result-skeleton-line" />
            <div className="result-skeleton-line" style={{ width: "60%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ResultError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="result-state result-error">
      <div className="result-state-icon">⚠️</div>
      <h2 className="result-state-title">Oops!</h2>
      <p className="result-state-message">{message}</p>
      <button className="result-state-cta" onClick={onRetry}>
        <RefreshCw size={16} />
        <span>Try Again</span>
      </button>
    </div>
  );
}

function ResultEmpty({
  message,
  onStartOver,
}: {
  message: string;
  onStartOver: () => void;
}) {
  return (
    <div className="result-state result-empty">
      <div className="result-state-icon">🔍</div>
      <h2 className="result-state-title">No Products Found</h2>
      <p className="result-state-message">{message}</p>
      <button className="result-state-cta" onClick={onStartOver}>
        <RefreshCw size={16} />
        <span>Start Over</span>
      </button>
    </div>
  );
}
