import { useState } from "react";
import { ArrowRight } from "lucide-react";
import "./Question.template.css";

export type RawAnswer =
  | string
  | { label: string; value_min: number; value_max: number };

export interface QuizQuestion {
  question: string;
  options: RawAnswer[];
}

export interface QuizTemplateProps {
  data: QuizQuestion[];
  optionImages?: Record<string, string>;
  budgetImages?: Record<string, string>;
  genderImages?: Record<string, string>;
  goldWords?: Set<string>;
  badgeText?: string;
  appName?: string;
  themeClass?: string;
  onComplete: (answers: RawAnswer[]) => void;
}
const getLabel = (o: RawAnswer) => (typeof o === "string" ? o : o.label);

export default function QuestionTemplate({
  data,
  optionImages = {},
  budgetImages = {},
  genderImages = {},
  goldWords = new Set(),
  badgeText = "Exclusive Offer",
  appName = "LuckySpinner",
  themeClass = "",
  onComplete,
}: QuizTemplateProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<RawAnswer[]>([]);
  const [picking, setPicking] = useState<string | null>(null);

  const current = data[step];
  const isLast = step === data.length - 1;
  const progress = (step / data.length) * 100;

  const handleSelect = (option: RawAnswer) => {
    const label = getLabel(option);
    if (picking) return;

    setPicking(label);
    const newAnswers = [...answers, option];

    setTimeout(() => {
      setPicking(null);

      if (isLast) {
        onComplete(newAnswers);
      } else {
        setAnswers(newAnswers);
        setStep((s) => s + 1);
      }
    }, 320);
  };

  // Chunk options into rows of 2
  const rows: RawAnswer[][] = [];
  for (let i = 0; i < current.options.length; i += 2) {
    rows.push(
      [current.options[i], current.options[i + 1]].filter(
        Boolean,
      ) as RawAnswer[],
    );
  }

  // Split app name: first word white, rest accent
  const nameParts = appName.split(/(?=[A-Z])/); // e.g. ["Lucky", "Spinner"]

  return (
    <div className={`quiz-root ${themeClass}`.trim()}>
      {/* ── Ambient glows ── */}
      <div className="quiz-glows" aria-hidden>
        <div className="quiz-glow-top" />
        <div className="quiz-glow-bottom" />
      </div>

      {/* ── Header ── */}
      <header className="quiz-header">
        <div className="quiz-logo">
          <span className="quiz-logo-white">{nameParts[0]}</span>
          {nameParts.slice(1).map((part, i) => (
            <span key={i} className="quiz-logo-accent">
              {part}
            </span>
          ))}
        </div>
        <div className="quiz-live-badge" role="status" aria-label="Live now">
          <div className="quiz-live-dot" />
          <span className="quiz-live-text">Live Now</span>
        </div>
      </header>

      {/* ── Progress ── */}
      <div
        className="quiz-progress"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={data.length}
      >
        <div className="quiz-progress-track">
          <div
            className="quiz-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="quiz-progress-labels">
          <span className="quiz-progress-label">
            {step + 1} / {data.length}
          </span>
          <span className="quiz-progress-label">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* ── Question ── */}
      <section className="quiz-question">
        <div className="quiz-badge">
          <span className="quiz-badge-text">{badgeText}</span>
        </div>

        <h2 className="quiz-question-text">
          {current.question.split(" ").map((word, i) => (
            <span
              key={i}
              className={
                goldWords.has(word.toLowerCase().replace(/[^a-z?]/g, ""))
                  ? "quiz-word-accent"
                  : undefined
              }
            >
              {word}{" "}
            </span>
          ))}
        </h2>

        <p className="quiz-hint">Tap an option to continue</p>
      </section>

      {/* ── Option grid ── */}
      <div className="quiz-grid" role="list">
        {rows.map((row, ri) => (
          <div key={ri} className="quiz-row">
            {row.map((option) => {
              const label = getLabel(option);
              const img = optionImages[label] || genderImages[label] || budgetImages[label] || null;
              const isSelecting = picking === label;

              return (
                <button
                  key={label}
                  role="listitem"
                  aria-label={label}
                  aria-pressed={isSelecting}
                  className={[
                    "quiz-option",
                    isSelecting ? "quiz-option--selecting" : "",
                  ]
                    .join(" ")
                    .trim()}
                  onClick={() => handleSelect(option)}
                >
                  {/* Image or gradient */}
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      aria-hidden
                      className="quiz-option-img"
                    />
                  ) : (
                    <div className="quiz-option-gradient" aria-hidden />
                  )}

                  {/* Dark overlay */}
                  <div className="quiz-option-overlay" aria-hidden />

                  {/* Selection flash */}
                  {isSelecting && (
                    <div className="quiz-option-highlight" aria-hidden />
                  )}

                  {/* Checkmark */}
                  {isSelecting && (
                    <div className="quiz-check" aria-hidden>
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

                  {/* Footer */}
                  <div className="quiz-option-footer">
                    <span className="quiz-option-label">{label}</span>
                    <span className="quiz-option-arrow">
                      <ArrowRight size={13} color="#fff" />
                    </span>
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
