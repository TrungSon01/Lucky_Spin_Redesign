import "./Homepage.css";
import {
  useAsyncStorage,
  useCurrentUser,
  useNavigateWithTransition,
} from "@shopify/shop-minis-react";
import { STEPS, TRUST } from "./Data/Data";
import { useEffect } from "react";
import { useLocalZustand } from "../../zustand/app.useLocalZustand";
import { registerNewUser } from "../../apis/app.api";
export default function Homepage() {
  const { currentUser } = useCurrentUser();
  const { setItem, getItem } = useAsyncStorage();
  const navigate = useNavigateWithTransition();
  const user_data = {
    name: currentUser?.displayName || "Guest",
    avatar: currentUser?.avatarImage?.url || "",
  };

  useEffect(() => {
    const handleStorageOperations = async () => {
      try {
        const check_first_join = await getItem({
          key: "is_first_join",
        });

        const [
          user_name,
          user_avatar,
          current_streak,
          rounds_played,
          achievement_highest_tier,
          achievement_highest_rank_count,
          achievement_highest_streak,
          achievement_first_purchase,
        ] = await Promise.all([
          getItem({ key: "user_name" }),
          getItem({ key: "user_avatar" }),
          getItem({ key: "current_streak" }),
          getItem({ key: "rounds_played" }),
          getItem({ key: "achievement_highest_tier" }),
          getItem({ key: "achievement_highest_rank_count" }),
          getItem({ key: "achievement_highest_streak" }),
          getItem({ key: "achievement_first_purchase" }),
        ]);

        // ===== USER MỚI =====
        if (!check_first_join) {
          const defaultData = {
            user_name: user_name || user_data.name,
            user_avatar: user_avatar || user_data.avatar,
            current_streak: current_streak || "0",
            rounds_played: rounds_played || "0",
            achievement_highest_tier: achievement_highest_tier || "Bronze",
            achievement_highest_rank_count:
              achievement_highest_rank_count || "0",
            achievement_highest_streak: achievement_highest_streak || "0",
            achievement_first_purchase: achievement_first_purchase || "0",
          };

          const storageTasks: Promise<any>[] = [];

          if (!user_name) {
            storageTasks.push(
              setItem({
                key: "user_name",
                value: user_data.name,
              }),
            );
          }

          if (!user_avatar) {
            storageTasks.push(
              setItem({
                key: "user_avatar",
                value: user_data.avatar,
              }),
            );
          }

          if (!current_streak) {
            storageTasks.push(
              setItem({
                key: "current_streak",
                value: "0",
              }),
            );
          }

          if (!rounds_played) {
            storageTasks.push(
              setItem({
                key: "rounds_played",
                value: "0",
              }),
            );
          }

          if (!achievement_highest_tier) {
            storageTasks.push(
              setItem({
                key: "achievement_highest_tier",
                value: "Bronze",
              }),
            );
          }

          if (!achievement_highest_rank_count) {
            storageTasks.push(
              setItem({
                key: "achievement_highest_rank_count",
                value: "0",
              }),
            );
          }

          if (!achievement_highest_streak) {
            storageTasks.push(
              setItem({
                key: "achievement_highest_streak",
                value: "0",
              }),
            );
          }

          if (!achievement_first_purchase) {
            storageTasks.push(
              setItem({
                key: "achievement_first_purchase",
                value: "0",
              }),
            );
          }

          storageTasks.push(
            setItem({
              key: "is_first_join",
              value: "true",
            }),
          );

          await Promise.all(storageTasks);
          await registerNewUser(user_data.name);
          useLocalZustand.getState().setState(defaultData);

          return;
        }

        // ===== USER CŨ =====

        const streakBonus = Math.min(
          Math.floor((Number(current_streak) || 0) / 10),
          15,
        );

        const highest_rank_count = Math.max(
          Number(achievement_highest_rank_count) || 0,
          (Number(rounds_played) || 0) + streakBonus,
        );

        if (
          highest_rank_count > (Number(achievement_highest_rank_count) || 0)
        ) {
          await setItem({
            key: "achievement_highest_rank_count",
            value: String(highest_rank_count),
          });
        }

        useLocalZustand.getState().setState({
          user_name: user_name || user_data.name,
          user_avatar: user_avatar || user_data.avatar,
          current_streak: current_streak || "0",
          rounds_played: rounds_played || "0",
          achievement_highest_tier: achievement_highest_tier || "Bronze",
          achievement_highest_rank_count: String(highest_rank_count),
          achievement_highest_streak: achievement_highest_streak || "0",
          achievement_first_purchase: achievement_first_purchase || "0",
        });
      } catch (error) {
        console.error("handleStorageOperations error:", error);
      }
    };

    handleStorageOperations();
  }, [setItem]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/main");
    }, 4100);

    alert(currentUser?.displayName);
    return () => clearTimeout(timer);
  }, []);
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
        {/* <button
          className="cta-btn"
          onClick={() => navigateWithTransition("/main")}
        >
          <div className="cta-text">
            <span className="cta-sub">Ready to spin?</span>
            <span className="cta-label">Get Started →</span>
          </div>
          <div className="cta-icon">🎲</div>
        </button> */}
      </div>
    </div>
  );
}
