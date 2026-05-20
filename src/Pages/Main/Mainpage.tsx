import { Image, useNavigateWithTransition } from "@shopify/shop-minis-react";
import useDataMainpage from "./Data/useDataMainpage";
import { useState } from "react";
import DefaultAvatar from "../../images/Avatar/DefaultAvatar.jpg";
import "./Mainpage.css";
import { useLocalZustand } from "../../zustand/app.useLocalZustand";
export default function Mainpage() {
  const navigate = useNavigateWithTransition();
  const CATEGORIES = useDataMainpage().CATEGORIES;
  const { TAG_STYLES, s, press, pressGrid, hoverShrink, hoverReset } =
    useDataMainpage();
  const [showAll, setShowAll] = useState(false);
  const { user_name, user_avatar } = useLocalZustand().state;

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
          {user_name ? (
            <Image
              src={user_avatar || DefaultAvatar}
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
        <div style={s.banner} onClick={() => navigate("/lucky-spin")}>
          <div style={s.bannerRing}>
            <div style={s.bannerRingInner}>🎰</div>
          </div>
          <div style={s.bannerText}>
            <div style={s.bannerTitle}>Your lucky deal is waiting</div>
            <div style={s.bannerSub}>Spin to win a personalized reward</div>
          </div>
          <div style={s.bannerCta}>Let try</div>
        </div>

        {/* Categories */}
        <div style={s.sectionRow}>
          <h2 style={s.sectionTitle}>Categories</h2>
          <span style={s.sectionCount}>{`${CATEGORIES.length} items`}</span>
        </div>

        <div style={s.list}>
          {/* 5 item đầu - luôn hiển thị dạng list */}
          {CATEGORIES.slice(0, 5).map((item) => (
            <div
              key={item.label}
              style={s.card}
              onClick={(e) =>
                press(
                  e,
                  `/questions/${item.label.toLowerCase().replace(/\s+/g, "-")}`,
                )
              }
              onTouchStart={hoverShrink}
              onTouchEnd={hoverReset}
              onTouchCancel={hoverReset}
              onMouseEnter={hoverShrink}
              onMouseLeave={hoverReset}
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

          <button className="btn-mainpage" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "View All Categories"}
          </button>

          {/* Grid layout: 3 items per row when showAll is true */}
          {showAll && (
            <div style={s.grid}>
              {CATEGORIES.slice(5).map((item) => (
                <div
                  key={item.label}
                  className="grid-card-custom"
                  style={{
                    backgroundColor: "#16152A",
                    border: "1px solid #252340",
                    borderRadius: "16px",
                    padding: "16px 8px 14px",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    minHeight: "100px",
                  }}
                  onClick={(e) =>
                    pressGrid(
                      e,
                      `/questions/${item.label.toLowerCase().replace(/\s+/g, "-")}`,
                    )
                  }
                >
                  <div
                    className="grid-icon"
                    style={{
                      backgroundColor: item.bg,
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "48px",
                      height: "48px",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="grid-label"
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      letterSpacing: "-0.1px",
                      textAlign: "center",
                      lineHeight: "1.2",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.tag && (
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        padding: "2px 6px",
                        borderRadius: "6px",
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        ...TAG_STYLES[item.tag],
                      }}
                    >
                      {item.tag.toUpperCase()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
