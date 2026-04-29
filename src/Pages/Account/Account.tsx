import { useEffect, useState, useMemo } from "react";
import { ChevronRight, ArrowLeft, Flame, Target, Clock } from "lucide-react";
import "./Account.css";
import {
  Image,
  useAsyncStorage,
  useCurrentUser,
  useNavigateWithTransition,
  useSavedProducts,
  ProductCard,
} from "@shopify/shop-minis-react";
import { TIER_CONFIG } from "./Data/level";
import DefaultAvatar from "../../images/Avatar/DefaultAvatar.jpg";

// Helper: format last_online timestamp to relative time
function formatLastOnline(timestamp: string | null): string {
  if (!timestamp) return "Never";
  const now = Date.now();
  const diff = now - parseInt(timestamp, 10);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

// Helper: calculate tier from rank
function getTierByRank(rank: number) {
  if (rank <= 3) return TIER_CONFIG.bronze;
  if (rank <= 10) return TIER_CONFIG.silver;
  if (rank <= 20) return TIER_CONFIG.gold;
  if (rank <= 50) return TIER_CONFIG.ruby;
  if (rank > 50 && rank <= 100) {
    const tier = { ...TIER_CONFIG.diamond };
    const level = Math.ceil((rank - 50) / 10);
    const roman = ["I", "II", "III", "IV", "V"];
    tier.label = `Diamond ${roman[level - 1]}`;
    return tier;
  }
  if (rank > 100) {
    return { ...TIER_CONFIG.Ultimate_diamond, label: "Ultimate" };
  }
  return null;
}

export default function Account() {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigateWithTransition();
  const { getItem, setItem } = useAsyncStorage();
  const { products: wishlist } = useSavedProducts({
    first: 9999,
    fetchPolicy: "network-only",
  });

  const [userRank, setUserRank] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<string>("0");
  const [lastOnline, setLastOnline] = useState<string>("");
  const [roundsPlayed, setRoundsPlayed] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllUserData() {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [rankStr, streak, rounds, lastOnlineRaw] = await Promise.all([
          getItem({ key: "user_rank" }),
          getItem({ key: "current_streak" }),
          getItem({ key: "rounds_played" }),
          getItem({ key: "last_online" }),
        ]);

        // Ensure rank exists (initialize if needed)
        if (!rankStr) {
          await setItem({ key: "user_rank", value: "0" });
        }
        const rank = rankStr ? parseInt(rankStr, 10) : 0;
        setUserRank(isNaN(rank) ? 0 : 101);

        // Streak
        const streakVal = streak ? parseInt(streak, 10) : 0;
        setCurrentStreak(isNaN(streakVal) ? "0" : String(streakVal));

        // Rounds
        const roundsVal = rounds ? parseInt(rounds, 10) : 0;
        setRoundsPlayed(isNaN(roundsVal) ? "0" : String(roundsVal));

        // Last online
        setLastOnline(lastOnlineRaw || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllUserData();
  }, [getItem, setItem]);

  const tier = useMemo(() => getTierByRank(userRank), [userRank]);

  // Format stats
  const formattedStreak = useMemo(() => {
    const num = parseInt(currentStreak, 10);
    return isNaN(num) ? 0 : num;
  }, [currentStreak]);

  const formattedRounds = useMemo(() => {
    const num = parseInt(roundsPlayed, 10);
    return isNaN(num) ? 0 : num;
  }, [roundsPlayed]);

  const formattedLastOnline = useMemo(() => {
    return formatLastOnline(lastOnline);
  }, [lastOnline]);

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
              <div className="stat-icon clock">
                <Clock size={18} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{formattedLastOnline}</div>
                <div className="stat-label">Last Active</div>
              </div>
            </div>
          </div>
        </section>

        {/* Wishlist Section */}
        <section className="wishlist-section">
          <div className="section-header">
            <h2 className="section-title">My Wishlist</h2>
            <span className="section-count">{wishlist?.length || 0} items</span>
          </div>

          {isLoading ? (
            <div className="wishlist-empty">
              <div className="loading-spinner" />
              <p>Loading your wishlist...</p>
            </div>
          ) : wishlist && wishlist.length > 0 ? (
            <div className="wishlist-grid">
              {wishlist.map((product, index) => (
                <div
                  key={product.id}
                  className="wishlist-item"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard variant="priceOverlay" product={product} />
                </div>
              ))}
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

        {/* Preferences / App Info */}
        <section className="preferences-section">
          <div className="settings-group">
            <div className="settings-row">
              <div className="row-icon ic-star" />
              <span className="row-label">Rate LuckySpinner</span>
              <ChevronRight size={18} className="row-chev" />
            </div>
            <div className="row-divider" />
            <div className="settings-row">
              <div className="row-icon ic-gear" />
              <span className="row-label">Settings</span>
              <ChevronRight size={18} className="row-chev" />
            </div>
            <div className="row-divider" />
            <div className="settings-row">
              <div className="row-icon ic-shield" />
              <span className="row-label">Privacy Policy</span>
              <ChevronRight size={18} className="row-chev" />
            </div>
            <div className="row-divider" />
            <div className="settings-row">
              <div className="row-icon ic-help" />
              <span className="row-label">Help & Support</span>
              <ChevronRight size={18} className="row-chev" />
            </div>
          </div>
        </section>

        {/* Version */}
        <p className="version-text">LuckySpinner v1.0.0</p>
      </div>
    </div>
  );
}
