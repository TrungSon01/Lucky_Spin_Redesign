import { useState } from "react";
import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import useNavigateIcon from "./Hooks/useNavigateIcon";
import "./Tabbar.css";

export default function Tabbar({ children }: { children: React.ReactNode }) {
  const { TABS_LEFT, TABS_RIGHT } = useNavigateIcon();
  const navigate = useNavigateWithTransition();
  const [activePath, setActivePath] = useState("/main");

  const handleNavigate = (path: string) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <div className="tabbar-root">
      <div className="tabbar-content">{children}</div>

      <nav className="tabbar">
        {/* Gradient definition cho SVG stroke active */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="tab-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f5c842" />
              <stop offset="100%" stopColor="#e8824a" />
            </linearGradient>
          </defs>
        </svg>

        {TABS_LEFT.map((tab) => {
          const active = activePath === tab.path;
          return (
            <button
              key={tab.path}
              className={`tab-btn${active ? " active" : ""}`}
              onClick={() => handleNavigate(tab.path)}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
            >
              <div className="tab-icon-wrap">
                {tab.icon(active)}
                {tab.badge ? (
                  <span className="tab-badge">{tab.badge}</span>
                ) : null}
              </div>
              <span className="tab-label">{tab.label}</span>
            </button>
          );
        })}

        {/* Spin CTA */}
        <button
          className="tab-spin"
          onClick={() => navigate("/spin")}
          aria-label="Spin"
        >
          <div className="spin-orb">
            <svg viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="7"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.4"
              />
              <circle cx="12" cy="12" r="2.5" fill="white" />
              <path
                d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="spin-label">Spin</span>
        </button>

        {TABS_RIGHT.map((tab) => {
          const active = activePath === tab.path;
          return (
            <button
              key={tab.path}
              className={`tab-btn${active ? " active" : ""}`}
              onClick={() => handleNavigate(tab.path)}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
            >
              <div className="tab-icon-wrap">
                {tab.icon(active)}
                {tab.badge ? (
                  <span className="tab-badge">{tab.badge}</span>
                ) : null}
              </div>
              <span className="tab-label">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
