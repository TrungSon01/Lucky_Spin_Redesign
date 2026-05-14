import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import { useEffect } from "react";
import { useCategoryStore } from "../../../zustand/useCategoriesZustand";

export default function useDataMainpage() {
  const navigate = useNavigateWithTransition();
  const setCategories = useCategoryStore((state) => state.setCategories);

  const CATEGORIES = [
    {
      label: "Accessories",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="#FB923C" strokeWidth="1.8" />
          <path
            d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"
            stroke="#FB923C"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
      bg: "#28180D",
      tag: "Elegant",
    },


     {
      label: "Beauty",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
            stroke="#F472B6"
            strokeWidth="1.8"
          />
          <path
            d="M8 14s1.5 2 4 2 4-2 4-2"
            stroke="#F472B6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="9"
            y1="9"
            x2="9.01"
            y2="9"
            stroke="#F472B6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="15"
            y1="9"
            x2="15.01"
            y2="9"
            stroke="#F472B6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      bg: "#28101E",
      tag: "New",
    },
    {
      label: "Clothing",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"
            stroke="#A78BFA"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bg: "#1A1630",
      tag: "Hot",
    },
    {
      label: "Electronics",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="2"
            stroke="#60A5FA"
            strokeWidth="1.8"
          />
          <line
            x1="8"
            y1="21"
            x2="16"
            y2="21"
            stroke="#60A5FA"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="17"
            x2="12"
            y2="21"
            stroke="#60A5FA"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
      bg: "#0D1A28",
      tag: "Technology",
    },
    {
      label: "Sport",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#38BDF8" strokeWidth="1.8" />
          <path
            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M2 12h20"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4.93 7h14.14M4.93 17h14.14"
            stroke="#38BDF8"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="2 2"
          />
        </svg>
      ),
      bg: "#07131f",
      tag: "Healthy",
    },

    {
      label: "Home",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"
            stroke="#C8A84B"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 21V12h6v9"
            stroke="#C8A84B"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bg: "#1C1A0E",
      tag: null,
    },
    // {
    //   label: "Pets",
    //   icon: (
    //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    //       <circle cx="12" cy="13" r="5" stroke="#FBBF24" strokeWidth="1.8" />
    //       <path
    //         d="M8 9.5L7 5.5l3.5 3"
    //         stroke="#FBBF24"
    //         strokeWidth="1.7"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M16 9.5l1-4-3.5 3"
    //         stroke="#FBBF24"
    //         strokeWidth="1.7"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <circle cx="10" cy="12.5" r="0.8" fill="#FBBF24" />
    //       <circle cx="14" cy="12.5" r="0.8" fill="#FBBF24" />
    //       <path
    //         d="M11 14.5h2"
    //         stroke="#FBBF24"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //       />
    //       <path
    //         d="M10.5 15.5c.5.6 1 .8 1.5.8s1-.2 1.5-.8"
    //         stroke="#FBBF24"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //       />
    //       <path
    //         d="M7 13.5l3 .5"
    //         stroke="#FBBF24"
    //         strokeWidth="1.3"
    //         strokeLinecap="round"
    //         opacity="0.7"
    //       />
    //       <path
    //         d="M17 13.5l-3 .5"
    //         stroke="#FBBF24"
    //         strokeWidth="1.3"
    //         strokeLinecap="round"
    //         opacity="0.7"
    //       />
    //     </svg>
    //   ),
    //   bg: "#28200A",
    //   tag: null,
    // },
    {
      label: "Food",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 8h1a4 4 0 0 1 0 8h-1"
            stroke="#4ADE80"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 8h15v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"
            stroke="#4ADE80"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <line
            x1="6"
            y1="2"
            x2="6"
            y2="6"
            stroke="#4ADE80"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="10"
            y1="2"
            x2="10"
            y2="6"
            stroke="#4ADE80"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="14"
            y1="2"
            x2="14"
            y2="6"
            stroke="#4ADE80"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
      bg: "#0B1F14",
      tag: null,
    },
    {
      label: "Toy",
      icon: (
        <svg width="20" height="20" viewBox="0 0 110 80" fill="none">
          <rect
            x="10"
            y="38"
            width="90"
            height="28"
            rx="6"
            stroke="#E879F9"
            strokeWidth="1.8"
          />
          <path
            d="M22 38 L30 15 L80 15 L88 38Z"
            stroke="#E879F9"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M33 38 L39 18 L71 18 L77 38"
            stroke="#E879F9"
            strokeWidth="1.3"
            strokeLinejoin="round"
            opacity="0.6"
          />
          <line
            x1="55"
            y1="18"
            x2="55"
            y2="38"
            stroke="#E879F9"
            strokeWidth="1.3"
            opacity="0.5"
          />
          <circle cx="30" cy="68" r="10" stroke="#E879F9" strokeWidth="1.8" />
          <circle cx="30" cy="68" r="4" fill="#E879F9" opacity="0.4" />
          <circle cx="80" cy="68" r="10" stroke="#E879F9" strokeWidth="1.8" />
          <circle cx="80" cy="68" r="4" fill="#E879F9" opacity="0.4" />
          <path
            d="M14 52 Q18 44 30 44 Q42 44 46 52"
            stroke="#E879F9"
            strokeWidth="1.3"
            opacity="0.5"
          />
          <path
            d="M64 52 Q68 44 80 44 Q92 44 96 52"
            stroke="#E879F9"
            strokeWidth="1.3"
            opacity="0.5"
          />
          <rect
            x="97"
            y="44"
            width="7"
            height="5"
            rx="2"
            fill="#E879F9"
            opacity="0.8"
          />
        </svg>
      ),
      bg: "#240D2A",
      tag: "Baby",
    },
  ];
  useEffect(() => {
    const data = CATEGORIES;
    setCategories(data);
  }, []);
  const TAG_STYLES: Record<string, React.CSSProperties> = {
    Popular: {
      backgroundColor: "#1C1A08",
      color: "#C8A84B",
      border: "1px solid #3A3010",
    },
    New: {
      backgroundColor: "#28101E",
      color: "#F472B6",
      border: "1px solid #4A1830",
    },
    Hot: {
      backgroundColor: "#1A1630",
      color: "#AD8BFE",
      border: "1px solid #A27AFE",
    },
    Baby: {
      backgroundColor: "#240D2A",
      color: "#E879F9",
      border: "1px solid #A23A7C",
    },
    Technology: {
      backgroundColor: "#0D1A28",
      color: "#60A5FA",
      border: "1px solid #1E3A8A",
    },

    Healthy: {
      backgroundColor: "#0A1A28",
      color: "#38BDF8",
      border: "1px solid #1E3A8A",
    },
    Elegant: {
      backgroundColor: "#33200F",
      color: "#E7C96A",
      border: "1px solid #4A3A16",
    },
  };
  const press = (e: React.MouseEvent<HTMLDivElement>, to: string) => {
    const el = e.currentTarget;
    el.style.transform = "scale(0.95)";
    el.style.opacity = "0.7";
    setTimeout(() => {
      el.style.transform = "";
      el.style.opacity = "";
      navigate(to);
    }, 120);
  };
  const pressGrid = (e: React.MouseEvent<HTMLDivElement>, to: string) => {
    const el = e.currentTarget;
    el.style.transform = "scale(0.92)";
    el.style.opacity = "0.65";
    setTimeout(() => {
      el.style.transform = "";
      el.style.opacity = "";
      navigate(to);
    }, 120);
  };
  const hoverShrink = (
    e:
      | React.MouseEvent<HTMLButtonElement | HTMLDivElement>
      | React.TouchEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    const el = e.currentTarget;
    el.style.transform = "scale(0.95)";
    el.style.opacity = "0.7";
  };
  const hoverReset = (
    e:
      | React.MouseEvent<HTMLButtonElement | HTMLDivElement>
      | React.TouchEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    const el = e.currentTarget;
    el.style.transform = "";
    el.style.opacity = "";
  };
  const s: Record<string, React.CSSProperties> = {
    root: {
      minHeight: "100dvh",
      backgroundColor: "#0F0E1A",
      display: "flex",
      flexDirection: "column",
      fontFamily:
        "-apple-system,'SF Pro Display','SF Pro Text',BlinkMacSystemFont,sans-serif",
      WebkitFontSmoothing: "antialiased",
    },
    topBar: {
      padding: "24px 20px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    greeting: {
      fontSize: "14px",
      color: "#C8A84B",
      fontWeight: 600,
      textAlign: "center" as const,
      marginBottom: "4px",
    },
    greetingBold: {
      fontSize: "28px",
      fontWeight: 800,
      color: "#FFFFFF",
      letterSpacing: "-0.5px",
      textAlign: "center" as const,
      lineHeight: "34px",
      textShadow: "0 2px 10px rgba(200, 168, 75, 0.3)",
    },
    avatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      overflow: "hidden",
      backgroundColor: "#1C1A3A",
      border: "1.5px solid #252340",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "15px",
    },
    searchWrap: { padding: "14px 20px 6px" },
    searchBox: {
      backgroundColor: "#16152A",
      border: "1px solid #252340",
      borderRadius: "14px",
      padding: "0 14px",
      height: "44px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    searchInput: {
      flex: 1,
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: "15px",
      color: "#FFFFFF",
      fontFamily: "inherit",
    },
    body: {
      flex: 1,
      padding: "12px 20px 32px",
      overflowY: "auto",
      WebkitOverflowScrolling: "touch" as any,
    },
    banner: {
      margin: "0 0 18px",
      backgroundColor: "#16152A",
      border: "1px solid #2A2440",
      borderRadius: "16px",
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      cursor: "pointer",
      WebkitTapHighlightColor: "transparent" as any,
    },
    bannerRing: {
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      padding: "2px",
      background:
        "conic-gradient(from 180deg,#FFB347,#FF6B6B,#A855F7,#3B82F6,#FFB347)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    bannerRingInner: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      backgroundColor: "#16152A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
    },
    bannerText: { flex: 1 },
    bannerTitle: {
      fontSize: "14px",
      fontWeight: 700,
      color: "#FFFFFF",
      letterSpacing: "-0.1px",
      marginBottom: "2px",
    },
    bannerSub: { fontSize: "12px", color: "#9CA3AF", fontWeight: 500 },
    bannerCta: { fontSize: "13px", fontWeight: 700, color: "#C8A84B" },
    sectionRow: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: "12px",
    },
    sectionTitle: {
      fontSize: "17px",
      fontWeight: 700,
      color: "#FFFFFF",
      letterSpacing: "-0.3px",
      margin: 0,
    },
    sectionCount: { fontSize: "13px", color: "#6B7280", fontWeight: 500 },
    list: { display: "flex", flexDirection: "column", gap: "10px" },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px",
    },
    card: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      backgroundColor: "#16152A",
      border: "1px solid #252340",
      borderRadius: "16px",
      padding: "13px 16px",
      cursor: "pointer",
      WebkitTapHighlightColor: "transparent" as any,
      transition: "transform 0.1s ease, opacity 0.1s ease",
      userSelect: "none" as any,
    },
    gridCard: {
      display: "flex",
      flexDirection: "column" as any,
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      backgroundColor: "#16152A",
      border: "1px solid #252340",
      borderRadius: "16px",
      padding: "16px 8px 14px",
      cursor: "pointer",
      WebkitTapHighlightColor: "transparent" as any,
      transition: "transform 0.15s ease, opacity 0.15s ease",
      userSelect: "none" as any,
      minHeight: "100px",
    },
    gridIconWrap: {
      width: "48px",
      height: "48px",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0 as any,
    },
    gridCardLabel: {
      fontSize: "12px",
      fontWeight: 600,
      color: "#FFFFFF",
      letterSpacing: "-0.1px",
      textAlign: "center" as any,
      lineHeight: "1.2",
    },
    gridTag: {
      fontSize: "9px",
      fontWeight: 700,
      letterSpacing: "0.5px",
      padding: "2px 6px",
      borderRadius: "6px",
      position: "absolute" as any,
      top: "8px",
      right: "8px",
    },
    iconWrap: {
      width: "44px",
      height: "44px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    cardLabel: {
      flex: 1,
      fontSize: "15px",
      fontWeight: 600,
      color: "#FFFFFF",
      letterSpacing: "-0.1px",
    },
    tag: {
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.5px",
      padding: "3px 8px",
      borderRadius: "8px",
      marginRight: "4px",
    },
    chevron: {
      color: "#3D3B5C",
      fontSize: "20px",
      fontWeight: 300,
      lineHeight: 1,
    },
  };
  return {
    CATEGORIES,
    TAG_STYLES,
    s,
    press,
    pressGrid,
    hoverShrink,
    hoverReset,
  };
}
