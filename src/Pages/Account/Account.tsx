import {
  ChevronRight,
  ArrowLeft,
  Flame,
  Target,
  Trophy,
  Star,
} from "lucide-react";
import "./Account.css";
import {
  Image,
  useNavigateWithTransition,
  ProductCard,
} from "@shopify/shop-minis-react";
import DefaultAvatar from "../../images/Avatar/DefaultAvatar.jpg";
import useDataAccount from "./Hooks/useDataAccount";
import AchievementsSection from "./Components/AchievementsSection";

export default function Account() {
  const navigate = useNavigateWithTransition();
  const {
    avatarUrl,
    displayName,
    formattedRounds,
    formattedStreak,
    isLoading,
    rankProgress,
    seasonInfo,
    setShowAllWishlist,
    showAllWishlist,
    tier,
    wishlist,
    purchase,
  } = useDataAccount();

  return (
    <div className="account-root">
      {/* Header */}
      <div className="account-header">
        <button
          className="header-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="account-title">My Profile</h1>
      </div>

      {/* Scrollable content */}
      <div className="account-scroll">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="avatar">
            {avatarUrl ? (
              <Image src={avatarUrl} alt="Avatar" className="avatar-image" />
            ) : (
              <Image
                src={DefaultAvatar}
                alt="Default avatar"
                className="avatar-image"
              />
            )}
          </div>

          <div className="profile-info">
            <p className="profile-name">{displayName}</p>
            {tier && <p className="profile-tier">{tier.label}</p>}
          </div>

          {tier?.animationClass === "tier-anim-hkd" ? (
            <div className="hkd-outer">
              <div className="hkd-rays">
                <div className="hkd-ray r-top" />
                <div className="hkd-ray r-tl1" />
                <div className="hkd-ray r-tr1" />
                <div className="hkd-ray r-tl2" />
                <div className="hkd-ray r-tr2" />
                <div className="hkd-ray r-tl3" />
                <div className="hkd-ray r-tr3" />
              </div>
              <div className="hkd-sp sp-top">
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFE566"
                  />
                </svg>
              </div>
              <div className="hkd-sp sp-tl">
                <svg width="8" height="8" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFD700"
                  />
                </svg>
              </div>
              <div className="hkd-sp sp-tr">
                <svg width="8" height="8" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFF0A0"
                  />
                </svg>
              </div>
              <div className="hkd-sp sp-bot">
                <svg width="7" height="7" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFB300"
                  />
                </svg>
              </div>
              <div className="hkd-sp sp-far-tl">
                <svg width="7" height="7" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFD700"
                  />
                </svg>
              </div>
              <div className="hkd-sp sp-far-tr">
                <svg width="6" height="6" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFFACD"
                  />
                </svg>
              </div>
              <div className="hkd-sp sp-far-r">
                <svg width="6" height="6" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFC200"
                  />
                </svg>
              </div>
              <div className="hkd-sp sp-left">
                <svg width="7" height="7" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFD700"
                  />
                </svg>
              </div>

              <div className="hkd-sp sp-right">
                <svg width="7" height="7" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFE066"
                  />
                </svg>
              </div>

              <div className="hkd-sp sp-bl">
                <svg width="6" height="6" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFCC33"
                  />
                </svg>
              </div>

              <div className="hkd-sp sp-br">
                <svg width="6" height="6" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFF0A0"
                  />
                </svg>
              </div>

              <div className="hkd-sp sp-far-l">
                <svg width="6" height="6" viewBox="0 0 10 10">
                  <path
                    d="M5 0L6 3.8L10 5L6 6.2L5 10L4 6.2L0 5L4 3.8Z"
                    fill="#FFC200"
                  />
                </svg>
              </div>
              <span className="profile-badge tier-anim-hkd">
                <span className="badge-inner">{tier?.label}</span>
              </span>
            </div>
          ) : (
            tier && (
              <span
                className={`profile-badge ${tier.animationClass ?? ""}`}
                style={{
                  backgroundColor: tier.bg,
                  border: `2px solid ${tier.border}`,
                }}
              >
                <span className="badge-inner">{tier.label}</span>
              </span>
            )
          )}

          <ChevronRight size={18} className="row-chev" />
        </div>

        {/* Stats Section */}
        <section className="stats-section">
          {/* Next Rank - standalone top card */}
          <div className="stat-card stat-card--next-rank">
            <div className="stat-icon trophy">
              <Trophy size={18} />
            </div>
            <div className="stat-content">
              <div className="stat-label">
                {rankProgress.isMaxTier
                  ? "Max Tier"
                  : `${rankProgress.pointsNeeded} pts to ${rankProgress.nextTier}`}
              </div>
            </div>
          </div>

          {/* Grid: Day Streak, Rounds Played, First Join */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon flame">
                <Flame size={18} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{formattedStreak}</div>
                <div className="stat-label">Day Streak</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon target">
                <Target size={18} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{formattedRounds}</div>
                <div className="stat-label">Rounds Played</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon calendar">
                <Star size={18} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{rankProgress.currentRank}</div>
                <div className="stat-label">rank count</div>
              </div>
            </div>
          </div>
        </section>

        {/* Season Section */}
        <section className="season-section">
          <div className="season-card">
            <div className="season-header">
              <Trophy size={20} className="season-icon" />
              <h3 className="season-title">Current Season</h3>
            </div>
            <div className="season-content">
              <div className="season-name">{seasonInfo.name} Season</div>
              <div className="season-number">Season {seasonInfo.number}</div>
              <div className="season-timer">
                <span className="timer-label">Next season starts:</span>
                <span className="timer-date">{seasonInfo.nextStart}</span>
                <span className="timer-days">
                  {seasonInfo.daysRemaining} days remaining
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <AchievementsSection
          rounds={formattedRounds}
          streak={formattedStreak}
          rank={rankProgress.currentRank}
          purchase={+purchase}
        />
        {/* Wishlist Section */}
        <section className="wishlist-section">
          <div className="section-header">
            <h2 className="section-title">My Wishlist</h2>
            <div className="section-actions">
              <span className="section-count">
                {wishlist?.length || 0} items
              </span>
              {wishlist && wishlist.length > 6 && (
                <button
                  className="toggle-btn"
                  onClick={() => setShowAllWishlist(!showAllWishlist)}
                >
                  {showAllWishlist ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="wishlist-empty">
              <div className="loading-spinner" />
              <p>Loading your wishlist...</p>
            </div>
          ) : wishlist && wishlist.length > 0 ? (
            <div className="wishlist-grid">
              {(showAllWishlist ? wishlist : wishlist.slice(0, 6)).map(
                (product, index) => (
                  <div
                    key={product.id}
                    className="wishlist-item"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard variant="priceOverlay" product={product} />
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="wishlist-empty">
              <p className="empty-message">Your wishlist is empty</p>
              <p className="empty-sub">
                Save products you love to find them later
              </p>
            </div>
          )}
        </section>
        {/* Version */}
        <p className="version-text">LuckySpinner v1.0.0</p>
      </div>
    </div>
  );
}
