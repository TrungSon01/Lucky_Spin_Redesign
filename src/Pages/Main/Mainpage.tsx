import {
  Image,
  useAsyncStorage,
  useCurrentUser,
  useNavigateWithTransition,
} from "@shopify/shop-minis-react";
import useDataMainpage from "./Data/useDataMainpage";
import { useState, useEffect } from "react";
import DefaultAvatar from "../../images/Avatar/DefaultAvatar.jpg";
import "./Mainpage.css";
export default function Mainpage() {
  const navigate = useNavigateWithTransition();
  const { getItem, setItem } = useAsyncStorage();
  const CATEGORIES = useDataMainpage().CATEGORIES;
  const { TAG_STYLES, s, press } = useDataMainpage();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const { currentUser } = useCurrentUser();
  const user_infor = {
    user_name: "",
    user_avatar: "",
  };

  useEffect(() => {
    async function fetchUserInfo() {
      const userName = await getItem({ key: "user_name" });
      const userAvatar = await getItem({ key: "user_avatar" });
      user_infor.user_name = userName || currentUser?.displayName || "Guest";
      user_infor.user_avatar =
        userAvatar || currentUser?.avatarImage?.url || "";
    }

    fetchUserInfo();
  }, [getItem]);

  const filteredCategories = CATEGORIES.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const displayedCategories = searchQuery
    ? filteredCategories
    : showAll
      ? CATEGORIES
      : CATEGORIES.slice(0, 5);

  const handleTestStreak = async () => {
    const [current_streak, rounds_played] = await Promise.all([
      getItem({ key: "current_streak" }),
      getItem({ key: "rounds_played" }),
    ]);
    const newStreak = (Number(current_streak) || 0) + 1;
    const newRound = (Number(rounds_played) || 0) + 1;
    await setItem({
      key: "current_streak",
      value: String(newStreak),
    });
    await setItem({
      key: "rounds_played",
      value: String(newRound),
    });
  };
  return (
    <div style={s.root}>
      {/* Top bar */}
      <div style={s.topBar}>
        <header className="header-logo-mainpage">
          <div className="logo">
            Lucky<span className="logo__accent">Spinner</span>
          </div>
        </header>
        <button style={s.avatar} onClick={() => navigate("/account")}>
          {user_infor.user_avatar ? (
            <Image
              src={currentUser?.avatarImage?.url || user_infor.user_avatar}
              alt="avatar"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            ></Image>
          ) : (
            <Image
              src={DefaultAvatar}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            ></Image>
          )}
        </button>
      </div>

      {/* Body */}
      <div style={s.body}>
        {/* LuckySpinner promo banner */}
        <div style={s.banner} onClick={() => handleTestStreak()}>
          <div style={s.bannerRing}>
            <div style={s.bannerRingInner}>🎰</div>
          </div>
          <div style={s.bannerText}>
            <div style={s.bannerTitle}>Your lucky deal is waiting</div>
            <div style={s.bannerSub}>Spin to win a personalized reward</div>
          </div>
          <div style={s.bannerCta}>Try →</div>
        </div>

        {/* Categories */}
        <div style={s.sectionRow}>
          <h2 style={s.sectionTitle}>Categories</h2>
          <span style={s.sectionCount}>
            {searchQuery
              ? `${filteredCategories.length} results`
              : `${CATEGORIES.length} items`}
          </span>
        </div>

        <div style={s.list}>
          {displayedCategories.map((item) => (
            <div
              key={item.label}
              style={s.card}
              onClick={(e) =>
                press(
                  e,
                  `/questions/${item.label.toLowerCase().replace(/\s+/g, "-")}`,
                )
              }
            >
              <div style={{ ...s.iconWrap, backgroundColor: item.bg }}>
                {item.icon}
              </div>
              <span style={s.cardLabel}>{item.label}</span>
              {item.tag && (
                <span style={{ ...s.tag, ...TAG_STYLES[item.tag] }}>
                  {item.tag.toUpperCase()}
                </span>
              )}
              <span style={s.chevron}>›</span>
            </div>
          ))}
          <button
            className="text-stone-50"
            onClick={() => {
              if (searchQuery) {
                setSearchQuery("");
              } else {
                setShowAll(!showAll);
              }
            }}
          >
            {searchQuery
              ? "Clear Search"
              : showAll
                ? "Show Less"
                : "View All Categories"}
          </button>

          {searchQuery && filteredCategories.length === 0 && (
            <div
              style={{
                padding: "16px",
                color: "#6B7280",
                textAlign: "center",
              }}
            >
              No categories found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
