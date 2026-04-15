import { useState } from "react";
import { Data_Beauty } from "./Data/Data";
import "./Beauty.css";

import handbag from "../../../images/Beauty/handbag.jpg";
import hair_clip from "../../../images/Beauty/hair_clip.jpg";
import necklace from "../../../images/Beauty/necklace.jpg";
import ring from "../../../images/Beauty/ring.jpg";
import earrings from "../../../images/Beauty/earrings.jpg";
import bracelet from "../../../images/Beauty/bracelet.jpg";
import { I_OPTION_IMAGES } from "../Interfaces/Beauty.interface";
// import { OPTION_BUDGET } from "../Data/Budget";
type Answer = string | { label: string; value_min: number; value_max: number };

const OPTION_IMAGES: I_OPTION_IMAGES = {
  Handbag: handbag,
  "Hair Clip": hair_clip,
  Necklace: necklace,
  Ring: ring,
  Bracelet: bracelet,
  Earrings: earrings,
};
const GOLD_WORDS = new Set(["interested", "spend?", "willing", "lucky"]);

const getLabel = (o: Answer) => (typeof o === "string" ? o : o.label);

export default function Beauty() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [picking, setPicking] = useState<string | null>(null);

  const current = Data_Beauty[step];
  const isLast = step === Data_Beauty.length - 1;
  const progress = (step / Data_Beauty.length) * 100;

  const handleSelect = (option: Answer) => {
    const label = getLabel(option);
    if (picking) return;
    setPicking(label);

    // Trigger iOS haptic if available
    if (window.navigator && (window.navigator as any).vibrate) {
      (window.navigator as any).vibrate(10);
    }

    setTimeout(() => {
      setAnswers((p) => [...p, option]);
      setPicking(null);
      if (!isLast) setStep((s) => s + 1);
    }, 320);
  };

  // Build 2-column rows
  const rows: Answer[][] = [];
  for (let i = 0; i < current.options.length; i += 2) {
    rows.push(
      [current.options[i], current.options[i + 1]].filter(Boolean) as Answer[],
    );
  }

  return (
    <div className="beauty-root">
      {/* ── Ambient glows ── */}
      <div className="beauty-glows" aria-hidden>
        <div className="beauty-glow-top" />
        <div className="beauty-glow-bottom" />
      </div>

      {/* ── Header ── */}
      <header className="beauty-header">
        <div className="beauty-logo">
          <span className="beauty-logo-white">Lucky</span>
          <span className="beauty-logo-gold">Spinner</span>
        </div>
        <div className="beauty-live-badge" role="status" aria-label="Live now">
          <div className="beauty-live-dot" />
          <span className="beauty-live-text">Live Now</span>
        </div>
      </header>

      {/* ── Progress ── */}
      <div
        className="beauty-progress"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={Data_Beauty.length}
      >
        <div className="beauty-progress-track">
          <div
            className="beauty-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="beauty-progress-labels">
          <span className="beauty-progress-label">
            {step + 1} / {Data_Beauty.length}
          </span>
          <span className="beauty-progress-label">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* ── Question ── */}
      <section className="beauty-question">
        <div className="beauty-badge">
          <span className="beauty-badge-text">Exclusive Offer</span>
        </div>

        <h2 className="beauty-question-text">
          {current.question.split(" ").map((word, i) => (
            <span
              key={i}
              className={
                GOLD_WORDS.has(word.toLowerCase())
                  ? "beauty-word-gold"
                  : undefined
              }
            >
              {word}{" "}
            </span>
          ))}
        </h2>

        <p className="beauty-hint">Tap an option to continue</p>
      </section>

      {/* ── Option grid ── */}
      <div className="beauty-grid" role="list">
        {rows.map((row, ri) => (
          <div key={ri} className="beauty-row">
            {row.map((option) => {
              const label = getLabel(option);
              const img = OPTION_IMAGES[label as keyof typeof OPTION_IMAGES];
              const isSelecting = picking === label;

              return (
                <button
                  key={label}
                  role="listitem"
                  aria-label={label}
                  aria-pressed={isSelecting}
                  className={[
                    "beauty-option",
                    isSelecting ? "beauty-option--selecting" : "",
                  ]
                    .join(" ")
                    .trim()}
                  onClick={() => handleSelect(option)}
                >
                  {/* Image or gradient background */}
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      aria-hidden
                      className="beauty-option-img"
                    />
                  ) : (
                    <div className="beauty-option-gradient" aria-hidden />
                  )}

                  {/* Dark gradient overlay */}
                  <div className="beauty-option-overlay" aria-hidden />

                  {/* Selection flash */}
                  {isSelecting && (
                    <div className="beauty-option-highlight" aria-hidden />
                  )}

                  {/* Checkmark */}
                  {isSelecting && (
                    <div className="beauty-check" aria-hidden>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M2.5 6.5L5.5 9.5L10.5 4"
                          stroke="#fff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Footer: label + arrow */}
                  <div className="beauty-option-footer">
                    <span className="beauty-option-label">{label}</span>
                    <div className="beauty-option-arrow" aria-hidden>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path
                          d="M1.5 4H6.5M6.5 4L4 1.5M6.5 4L4 6.5"
                          stroke="rgba(255,255,255,0.6)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
