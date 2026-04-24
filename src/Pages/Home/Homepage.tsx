import "./Homepage.css";
import {
  useAsyncStorage,
  useCurrentUser,
  useNavigateWithTransition,
} from "@shopify/shop-minis-react";
import { STEPS, TRUST } from "./Data/Data";
import { useEffect } from "react";

export default function Homepage() {
  const navigateWithTransition = useNavigateWithTransition();
  const { currentUser } = useCurrentUser();
  const { setItem, getItem } = useAsyncStorage();

  const user_data = {
    name: currentUser?.displayName || "Guest",
    avatar: currentUser?.avatarImage?.url || "",
  };

  useEffect(() => {
    async function handleStorageOperations() {
      const [
        check_user_name,
        check_user_avatar,
        check_current_streak,
        check_rounds_played,
        check_first_time_join,
      ] = await Promise.all([
        getItem({ key: "user_name" }),
        getItem({ key: "user_avatar" }),
        getItem({ key: "current_streak" }),
        getItem({ key: "rounds_played" }),
        getItem({ key: "last_online" }),
      ]);
      if (!check_user_avatar && !check_user_name) {
        await setItem({
          key: "user_name",
          value: user_data.name,
        });
        await setItem({
          key: "user_avatar",
          value: user_data.avatar,
        });
      }
      if (!check_current_streak) {
        await setItem({
          key: "current_streak",
          value: "0",
        });
      }
      if (!check_rounds_played) {
        await setItem({
          key: "rounds_played",
          value: "0",
        });
      }
      if (!check_first_time_join) {
        await setItem({
          key: "last_online",
          value: `${Date.now()}`,
        });
      }
    }

    handleStorageOperations();
  }, [setItem]);

  return (
    <div className="homepage">
      <div className="orb orb--top" />
      <div className="orb orb--bottom" />

      {/* Header */}
      <header className="header">
        <div className="logo">
          Lucky<span className="logo__accent">Spinner</span>
        </div>
        <div className="live-badge">✦ Live Now</div>
      </header>

      {/* Main */}
      <main className="main">
        {/* Spinner */}
        <div className="spinner-wrap">
          <div className="spinner">
            <div className="spinner__ring">
              <div className="spinner__ring-inner" />
            </div>
            <div className="spinner__center">🎰</div>
          </div>
        </div>

        {/* Hero */}
        <div className="hero-tag">
          <span className="hero-tag__dot" />
          Exclusive Offer
        </div>
        <h1 className="hero-title">
          Find your <span className="hero-title__highlight">lucky deal</span>
        </h1>
        <p className="hero-subtitle">
          Answer a few quick questions and spin to win a personalized reward
          just for you.
        </p>

        {/* Steps */}
        <div className="steps">
          {STEPS.map((step) => (
            <div key={step.num} className="step-card">
              <div className={`step-icon ${step.iconClass}`}>{step.icon}</div>
              <div className="step-info">
                <div className="step-label">{step.label}</div>
                <div className="step-value">{step.value}</div>
              </div>
              <div className="step-num">{step.num}</div>
            </div>
          ))}
        </div>
      </main>

      {/* CTA */}
      <div className="cta-area">
        <div className="trust-row">
          {TRUST.map((t) => (
            <span key={t} className="trust-item">
              {t}
            </span>
          ))}
        </div>
        <button
          className="cta-btn"
          onClick={() => navigateWithTransition("/main")}
        >
          <div className="cta-text">
            <span className="cta-sub">Ready to spin?</span>
            <span className="cta-label">Get Started →</span>
          </div>
          <div className="cta-icon">🎲</div>
        </button>
      </div>
    </div>
  );
}
