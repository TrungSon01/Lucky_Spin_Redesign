import React from "react";
import { X, Lock, Sparkles } from "lucide-react";
import AchievementCard from "./AchievementCard";
import { ACHIEVEMENTS, type Achievement } from "../Data/achievements";
import { useLocalZustand } from "../../../zustand/app.useLocalZustand";

type AchievementProgress = {
  current: number;
  target: number | string;
};

type AchievementItem = {
  achievement: Achievement;
  isUnlocked: boolean;
  progress: AchievementProgress;
};

interface AchievementsSectionProps {
  rounds: number;
  streak: number;
  rank: number;
  purchase: number;
}

function getProgressValue(
  achievement: Achievement,
  streak: number,
  rounds: number,
  rank: number,
  purchase: number,
): number {
  switch (achievement.category) {
    case "rounds":
      return rounds;
    case "streak":
      return streak;
    case "rank":
      return rank;
    case "tier":
      return rank;
    case "purchase":
      return purchase;
    default:
      return 0;
  }
}

function getProgressTarget(achievement: Achievement): number | string {
  if (typeof achievement.target === "number") return achievement.target;
  if (achievement.id === "highest_tier") return 101;
  return achievement.target;
}

function getNumericTarget(achievement: Achievement): number {
  if (typeof achievement.target === "number") return achievement.target;
  if (achievement.id === "highest_tier") return 101;
  return 1;
}

export default function AchievementsSection({
  rounds,
  streak,
  rank,
  purchase,
}: AchievementsSectionProps) {
  const [items, setItems] = React.useState<AchievementItem[]>([]);
  const [selected, setSelected] = React.useState<AchievementItem | null>(null);

  React.useEffect(() => {
    let active = true;

    function loadAchievements() {
      const resolved = ACHIEVEMENTS.map((achievement) => {
        const current = getProgressValue(
          achievement,
          streak,
          rounds,
          rank,
          purchase,
        );

        const target = getProgressTarget(achievement);

        const byCondition = achievement.condition(
          streak,
          rounds,
          rank,
          purchase,
        );

        return {
          achievement,
          isUnlocked: byCondition,
          progress: {
            current:
              typeof target === "number"
                ? Math.min(current, getNumericTarget(achievement))
                : current,
            target,
          },
        } satisfies AchievementItem;
      });

      if (!active) return;

      setItems(resolved);
    }

    loadAchievements();

    return () => {
      active = false;
    };
  }, [rank, rounds, streak, purchase]);

  const unlocked = React.useMemo(
    () => items.filter((item) => item.isUnlocked),
    [items],
  );
  const locked = React.useMemo(
    () => items.filter((item) => !item.isUnlocked),
    [items],
  );

  const progressPercent = items.length
    ? Math.round((unlocked.length / items.length) * 100)
    : 0;
  const highest_rank_count =
    useLocalZustand().state.achievement_highest_rank_count;
  return (
    <section className="achievements-section">
      <div className="achievements-card-shell">
        <div className="achievements-hero">
          <div>
            <p className="achievements-eyebrow">Achievement progress</p>
            <h2 className="achievements-title">Your milestones</h2>
            <p className="achievements-subtitle">
              Unlock streak, rank, and spin milestones as you keep playing.
            </p>
          </div>
          <div className="achievements-counter">
            <Sparkles size={16} />
            <span>
              {unlocked.length}/{items.length || ACHIEVEMENTS.length}
            </span>
          </div>
        </div>

        <div
          className="achievements-progress-wrap"
          aria-label="Achievements progress"
        >
          <div className="achievements-progress-meta">
            <span>{progressPercent}% completed</span>
            <span>{locked.length} to go</span>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {unlocked.length > 0 && (
          <div className="achievement-group">
            <div className="achievement-group-header">
              <div className="achievement-group-title-wrap">
                <Sparkles
                  size={16}
                  className="achievement-group-icon achievement-group-icon--unlocked"
                />
                <h3 className="achievement-group-title">Unlocked</h3>
              </div>
              <span className="achievement-group-count">{unlocked.length}</span>
            </div>
            <div className="achievements-grid achievements-grid--featured">
              <AchievementCard
                achievement={items[0].achievement}
                isUnlocked={true}
                highest_rank_count={Number(highest_rank_count)}
              ></AchievementCard>
              {unlocked.map((item, index) => (
                <AchievementCard
                  key={item.achievement.id}
                  achievement={item.achievement}
                  isUnlocked={true}
                  progress={item.progress}
                  animationDelay={index * 60}
                  onLongPress={() => setSelected(item)}
                />
              ))}
            </div>
          </div>
        )}

        {locked.length > 0 && (
          <div className="achievement-group">
            <div className="achievement-group-header">
              <div className="achievement-group-title-wrap">
                <Lock
                  size={16}
                  className="achievement-group-icon achievement-group-icon--locked"
                />
                <h3 className="achievement-group-title">Locked</h3>
              </div>
              <span className="achievement-group-count">{locked.length}</span>
            </div>
            {/* <div className="achievements-grid">
              {locked.map((item, index) => (
                <AchievementCard
                  key={item.achievement.id}
                  achievement={item.achievement}
                  isUnlocked={false}
                  progress={item.progress}
                  animationDelay={index * 50}
                  onLongPress={() => setSelected(item)}
                />
              ))}
            </div> */}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="achievement-sheet-backdrop"
          onClick={() => setSelected(null)}
          aria-hidden="true"
        >
          <div
            className="achievement-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievement-sheet-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="achievement-sheet-handle" />
            <div className="achievement-sheet-header">
              <div>
                <p className="achievement-sheet-label">
                  {selected.isUnlocked ? "Unlocked achievement" : "In progress"}
                </p>
                <h3
                  id="achievement-sheet-title"
                  className="achievement-sheet-title"
                >
                  {selected.achievement.title}
                </h3>
              </div>
              <button
                className="achievement-sheet-close"
                onClick={() => setSelected(null)}
                aria-label="Close achievement details"
              >
                <X size={18} />
              </button>
            </div>

            <p className="achievement-sheet-description">
              {selected.achievement.description}
            </p>

            <div className="achievement-sheet-stats">
              <div className="achievement-sheet-stat">
                <span className="achievement-sheet-stat-label">Category</span>
                <strong>{selected.achievement.category}</strong>
              </div>
              <div className="achievement-sheet-stat">
                <span className="achievement-sheet-stat-label">Progress</span>
                <strong>
                  {selected.progress.current} / {selected.progress.target}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
