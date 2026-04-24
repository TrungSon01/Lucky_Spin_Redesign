import { useEffect, useState } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import "./Account.css";
import {
  Image,
  useAsyncStorage,
  useCurrentUser,
  useNavigateWithTransition,
  useSavedProducts,
} from "@shopify/shop-minis-react";
import { process_name } from "../../lib/function";
import { TIER_CONFIG } from "./Data/level";
import DefaultAvatar from "../../images/Avatar/DefaultAvatar.jpg";
export default function Account() {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigateWithTransition();
  const { getItem, setItem } = useAsyncStorage();
  const { products } = useSavedProducts({
    first: 9999,
    fetchPolicy: "cache-first",
  });
  const [userRank, setUserRank] = useState("0");
  const [current_streak, set_current_streak] = useState<string>("0");
  const [last_online, set_last_online] = useState<string>("0");
  const [rounds_played, set_rounds_played] = useState<string>("0");
  useEffect(() => {
    const check_user_rank = async () => {
      const [last_online, current_streak, rounds_played] = await Promise.all([
        getItem({ key: "last_online" }),
        getItem({ key: "current_streak" }),
        getItem({ key: "rounds_played" }),
      ]);
      set_current_streak(current_streak as string);
      set_last_online(last_online as string);
      set_rounds_played(rounds_played as string);
      const user_rank = await getItem({ key: "user_rank" });
      if (!user_rank) {
        setItem({
          key: "user_rank",
          value: "0",
        });
      }
    };

    const fetchUserRank = async () => {
      const rank = await getItem({ key: "user_rank" });
      setUserRank(rank || "1");
    };
    check_user_rank();
    fetchUserRank();
  }, [getItem, setItem]);
  const rank = +userRank;
  let tier;
  if (rank <= 3) {
    tier = TIER_CONFIG.bronze;
  } else if (rank <= 10) {
    tier = TIER_CONFIG.silver;
  } else if (rank <= 20) {
    tier = TIER_CONFIG.gold;
  } else if (rank <= 50) {
    tier = TIER_CONFIG.ruby;
  } else if (rank > 50 && rank <= 100) {
    tier = { ...TIER_CONFIG.diamond };
    const level = Math.ceil((rank - 50) / 10);
    const roman = ["I", "II", "III", "IV", "V"];
    tier.label = `Diamond ${roman[level - 1]}`;
  } else if (rank > 100) {
    tier = TIER_CONFIG.Ultimate_diamond;

    tier.label = `Ultimate Diamond`;
  }

  return (
    <div className="account-root">
      <div className="account-header">
        <button
          className="header-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="account-title">My profile</h1>
      </div>

      <div className="account-scroll">
        <button className="profile-card">
          <div className="avatar">
            {currentUser?.avatarImage?.url ? (
              <Image
                src={currentUser?.avatarImage?.url || DefaultAvatar}
                alt="Avatar"
                className="rounded-lg "
              ></Image>
            ) : (
              <span className="avatar-placeholder">
                {process_name(currentUser?.displayName || "")}
              </span>
            )}
          </div>
          <div className="profile-info">
            <p className="profile-name">{currentUser?.displayName}</p>
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
              <span className="profile-badge tier-anim-hkd">
                <span className="badge-inner">{tier?.label}</span>
              </span>
            </div>
          ) : (
            <span
              className={`profile-badge ${tier?.animationClass ?? ""}`}
              style={{
                backgroundColor: tier?.bg,
                border: `2px solid ${tier?.border}`,
              }}
            >
              <span className="badge-inner">{tier?.label}</span>
            </span>
          )}

          <ChevronRight size={18} className="row-chev" />
        </button>

        {/* Preferences group */}
        <p className="section-label">Preferences</p>

        <p className="version-text">LuckySpinner</p>
      </div>
    </div>
  );
}
