import {
  useAsyncStorage,
  useNavigateWithTransition,
} from "@shopify/shop-minis-react";
import useDataMainpage from "./Data/useDataMainpage";
import { useState, useEffect } from "react";

export default function Mainpage() {
  const navigate = useNavigateWithTransition();
  const { getItem } = useAsyncStorage();
  const CATEGORIES = useDataMainpage().CATEGORIES;
  const { TAG_STYLES, s, press } = useDataMainpage();
  const [searchQuery, setSearchQuery] = useState("");

  const user_infor = {
    user_name: "",
    user_avatar: "",
  };

  useEffect(() => {
    async function fetchUserInfo() {
      const userName = await getItem({ key: "user_name" });
      const userAvatar = await getItem({ key: "user_avatar" });
      user_infor.user_name = userName || "Guest";
      user_infor.user_avatar = userAvatar || "";
    }

    fetchUserInfo();
  }, [getItem]);

  const filteredCategories = CATEGORIES.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const displayedCategories = searchQuery
    ? filteredCategories
    : CATEGORIES.slice(0, 3);

  return (
    <div style={s.root}>
      {/* Top bar */}
      <div style={s.topBar}>
        <div>
          <div style={s.greeting}>Good morning 👋</div>
          <div style={s.greetingBold}>What are you looking for?</div>
        </div>
        <button style={s.avatar} onClick={() => navigate("/account")}>
          <img
            src={user_infor.user_avatar}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </button>
      </div>

      {/* Search */}
      <div style={s.searchWrap}>
        <div style={s.searchBox}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#6B7280" strokeWidth="1.8" />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
              stroke="#6B7280"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <input
            style={s.searchInput}
            type="text"
            placeholder="Search categories…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Body */}
      <div style={s.body}>
        {/* LuckySpinner promo banner */}
        <div style={s.banner} onClick={() => navigate("/lucky-spin")}>
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
