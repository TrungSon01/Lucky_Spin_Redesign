// import {
//   Award,
//   Flame,
//   Play,
//   TrendingUp,
//   Trophy,
//   type LucideIcon,
// } from "lucide-react";
// import type { DerivedAchievement } from "../Hooks/useDataAccount";

// const ICON_MAP: Record<string, LucideIcon> = {
//   Award,
//   Flame,
//   Play,
//   TrendingUp,
//   Trophy,
// };

// interface AchievementCardProps {
//   achievement: DerivedAchievement;
//   compact?: boolean;
// }

// export default function AchievementCard({
//   achievement,
//   compact = false,
// }: AchievementCardProps) {
//   const Icon = ICON_MAP[achievement.icon] ?? Award;

//   return (
//     <article
//       className={`achievement-card achievement-card--${achievement.status} ${compact ? "achievement-card--compact" : ""}`}
//       aria-label={`${achievement.title}: ${achievement.isUnlocked ? "Unlocked" : "In progress"}`}
//     >
//       <div className="achievement-card-top">
//         <div className={`achievement-icon achievement-icon--${achievement.status}`}>
//           <Icon size={compact ? 18 : 20} />
//         </div>
//         <div className="achievement-copy">
//           <div className="achievement-title-row">
//             <h3 className="achievement-title">{achievement.title}</h3>
//             {achievement.isNew && (
//               <span className="achievement-new-badge">New</span>
//             )}
//           </div>
//           <p className="achievement-description">{achievement.description}</p>
//         </div>
//       </div>

//       <div className="achievement-progress-block">
//         <div className="achievement-progress-meta">
//           <span className="achievement-status-text">
//             {achievement.isUnlocked
//               ? "Unlocked"
//               : `${achievement.currentValue}/${achievement.threshold}`}
//           </span>
//           {!achievement.isUnlocked && achievement.remainingToUnlock > 0 && (
//             <span className="achievement-remaining-text">
//               {achievement.remainingToUnlock} to go
//             </span>
//           )}
//         </div>
//         <div
//           className="achievement-progress-track"
//           aria-hidden="true"
//         >
//           <div
//             className="achievement-progress-fill"
//             style={{ width: `${achievement.progressPercent}%` }}
//           />
//         </div>
//       </div>
//     </article>
//   );
// }
