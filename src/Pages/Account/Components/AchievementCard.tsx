import React from "react";
import {
  Play,
  TrendingUp,
  Award,
  Flame,
  Target,
  Trophy,
  Star,
  Zap,
  Crown,
  type LucideIcon,
} from "lucide-react";
import "../Account.css";

const ICON_MAP: Record<string, LucideIcon> = {
  Play,
  TrendingUp,
  Award,
  Flame,
  Target,
  Trophy,
  Star,
  Zap,
  Crown,
};

interface AchievementCardProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: "rounds" | "streak" | "rank" | "tier" | "purchase";
    target: number | string;
  };
  highest_rank_count?: number;
  isUnlocked: boolean;
  progress?: { current: number; target: number | string };
  onLongPress?: () => void;
  animationDelay?: number;
}

function useLongPress(
  callback: () => void,
  delay: number = 500,
): React.HTMLAttributes<HTMLDivElement> {
  const timerRef = React.useRef<number | null>(null);
  const movedRef = React.useRef(false);
  const startX = React.useRef(0);
  const startY = React.useRef(0);

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onTouchStart = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      clearTimer();
      movedRef.current = false;
      startX.current = e.touches[0]?.clientX ?? 0;
      startY.current = e.touches[0]?.clientY ?? 0;
      timerRef.current = window.setTimeout(() => {
        if (!movedRef.current) callback();
      }, delay);
    },
    [callback, clearTimer, delay],
  );

  const onTouchMove = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const dx = Math.abs((e.touches[0]?.clientX ?? 0) - startX.current);
      const dy = Math.abs((e.touches[0]?.clientY ?? 0) - startY.current);
      if (dx > 10 || dy > 10) {
        movedRef.current = true;
        clearTimer();
      }
    },
    [clearTimer],
  );

  React.useEffect(() => clearTimer, [clearTimer]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd: clearTimer,
    onTouchCancel: clearTimer,
  };
}

export default function AchievementCard({
  achievement,
  isUnlocked,
  progress,
  onLongPress,

  highest_rank_count,
  animationDelay = 0,
}: AchievementCardProps) {
  const longPressAttrs = useLongPress(() => {
    onLongPress?.();
  }, 600);

  const IconComponent = ICON_MAP[achievement.icon] ?? Trophy;

  return (
    <div
      className={`achievement-card ${isUnlocked ? "unlocked" : "locked"}`}
      style={{ animationDelay: `${animationDelay}ms` }}
      {...longPressAttrs}
      role="button"
      aria-label={`Achievement: ${achievement.title}`}
      tabIndex={0}
    >
      <div className="achievement-icon">
        <IconComponent size={20} />
      </div>
      <div className="achievement-info">
        <div className="achievement-title">{achievement.title}</div>
        <div className="achievement-description">{achievement.description}</div>
        {highest_rank_count !== undefined && (
          <div className="achievement-progress">
            {`Highest Rank Count: ${highest_rank_count}`}
          </div>
        )}
        {!isUnlocked && progress && (
          <div className="achievement-progress">
            {progress.current} / {progress.target}
          </div>
        )}
        {isUnlocked && (
          <div className="achievement-unlocked-badge">
            <Crown size={12} /> Unlocked
          </div>
        )}
      </div>
    </div>
  );
}
