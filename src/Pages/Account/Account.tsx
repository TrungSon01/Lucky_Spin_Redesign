import { useEffect, useState, useMemo } from "react";
import {
  ChevronRight,
  ArrowLeft,
  Flame,
  Target,
  Calendar,
  Trophy,
  Star,
} from "lucide-react";
import "./Account.css";
import {
  Image,
  useAsyncStorage,
  useCurrentUser,
  useNavigateWithTransition,
  useSavedProducts,
  ProductCard,
} from "@shopify/shop-minis-react";
import DefaultAvatar from "../../images/Avatar/DefaultAvatar.jpg";
import { getTierByRank } from "../../lib/function";

export default function Account() {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigateWithTransition();
  const { getItem } = useAsyncStorage();
  const { products: wishlist } = useSavedProducts({
    first: 9999,
    fetchPolicy: "network-only",
  });

  const [userRank, setUserRank] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<string>("0");
  const [firstJoin, setFirstJoin] = useState<string>("");
  const [roundsPlayed, setRoundsPlayed] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(true);
  const [showAllWishlist, setShowAllWishlist] = useState(false);

  useEffect(() => {
    async function fetchAllUserData() {
      setIsLoading(true);
      try {
        const [streak, rounds, firstJoinRaw] = await Promise.all([
          getItem({ key: "current_streak" }),
          getItem({ key: "rounds_played" }),
          getItem({ key: "first_join" }),
        ]);

        // parse số
        const streakVal = streak ? parseInt(streak, 10) : 0;
        const roundsVal = rounds ? parseInt(rounds, 10) : 0;

        const safeStreak = isNaN(streakVal) ? 0 : streakVal;
        const safeRounds = isNaN(roundsVal) ? 0 : roundsVal;

        setCurrentStreak(String(safeStreak));
        setRoundsPlayed(String(safeRounds));

        const rank = Math.floor(
          safeStreak < 100 ? safeStreak / 10 + safeRounds : 15 + safeRounds,
        );

        setUserRank(rank);
        setFirstJoin(firstJoinRaw || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllUserData();
  }, [getItem]);
  const tier = useMemo(() => getTierByRank(userRank), [userRank]);

  // Calculate points needed for next tier
  const rankProgress = useMemo(() => {
    if (userRank >= 101) {
      return {
        currentRank: userRank,
        nextTier: null,
        pointsNeeded: 0,
        isMaxTier: true,
      };
    }

    let nextThreshold: number;
    let nextTierName: string;

    if (userRank < 4) {
      nextThreshold = 4;
      nextTierName = "Silver";
    } else if (userRank < 11) {
      nextThreshold = 11;
      nextTierName = "Gold";
    } else if (userRank < 21) {
      nextThreshold = 21;
      nextTierName = "Ruby";
    } else if (userRank < 51) {
      nextThreshold = 51;
      nextTierName = "Diamond";
    } else {
      // userRank < 101 at this point
      nextThreshold = 101;
      nextTierName = "Ultimate Diamond";
    }

    return {
      currentRank: userRank,
      nextTier: nextTierName,
      pointsNeeded: nextThreshold - userRank,
      isMaxTier: false,
    };
  }, [userRank]);

  // Calculate current season (updates every 3 months: Jan 1, Apr 1, Jul 1, Oct 1)
  const seasonInfo = useMemo(() => {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const year = now.getFullYear();

    let seasonNumber: number;
    let seasonName: string;
    let nextSeasonStart: Date;

    // Determine current season based on month
    // Season 1: Jan - Mar (starts Jan 1)
    // Season 2: Apr - Jun (starts Apr 1)
    // Season 3: Jul - Sep (starts Jul 1)
    // Season 4: Oct - Dec (starts Oct 1)
    if (month >= 0 && month <= 2) {
      // Jan-Mar
      seasonNumber = 1;
      seasonName = "Spring";
      nextSeasonStart = new Date(year, 3, 1); // Apr 1
    } else if (month >= 3 && month <= 5) {
      // Apr-Jun
      seasonNumber = 2;
      seasonName = "Summer";
      nextSeasonStart = new Date(year, 6, 1); // Jul 1
    } else if (month >= 6 && month <= 8) {
      // Jul-Sep
      seasonNumber = 3;
      seasonName = "Autumn";
      nextSeasonStart = new Date(year, 9, 1); // Oct 1
    } else {
      // Oct-Dec
      seasonNumber = 4;
      seasonName = "Winter";
      nextSeasonStart = new Date(year + 1, 0, 1); // Jan 1 next year
    }

    // Calculate days until next season
    const daysRemaining = Math.ceil(
      (nextSeasonStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    return {
      number: seasonNumber,
      name: seasonName,
      nextStart: nextSeasonStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      daysRemaining: Math.max(0, daysRemaining),
    };
  }, []);

  // Format stats
  const formattedStreak = useMemo(() => {
    const num = parseInt(currentStreak, 10);
    return isNaN(num) ? 0 : num;
  }, [currentStreak]);

  const formattedRounds = useMemo(() => {
    const num = parseInt(roundsPlayed, 10);
    return isNaN(num) ? 0 : num;
  }, [roundsPlayed]);

  const formattedFirstJoin = useMemo(() => {
    return firstJoin || "N/A";
  }, [firstJoin]);

  // Avatar display
  const displayName = currentUser?.displayName || "Guest";
  const avatarUrl = currentUser?.avatarImage?.url;

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

        {/* Wishlist Section */}
        <section className="wishlist-section">
          <div className="section-header">
            <h2 className="section-title">My Wishlist</h2>
            <div className="section-actions">
              <span className="section-count">{wishlist?.length || 0} items</span>
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
