import "./Homepage.css";
import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import { STEPS, TRUST } from "./Data/Data";

export default function Homepage() {
  const navigateWithTransition = useNavigateWithTransition();

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
