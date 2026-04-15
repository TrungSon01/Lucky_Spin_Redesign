export const TIER_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    animationClass?: string;
  }
> = {
  bronze: {
    label: "Bronze",
    color: "#7C3A1E",
    bg: "#FDF0E8",
    border: "#C4793A",
    animationClass: "tier-anim-bronze",
  },
  silver: {
    label: "Silver",
    color: "#3D4756",
    bg: "#F1F3F6",
    border: "#8A95A3",
    animationClass: "tier-anim-silver",
  },
  gold: {
    label: "Gold",
    color: "#6B4400",
    bg: "#FEF7E0",
    border: "#D4A017",
    animationClass: "tier-anim-gold",
  },
  ruby: {
    label: "Ruby",
    color: "transparent", // bị override bởi gradient text trong CSS
    bg: "#1a0008",
    border: "#E0185E",
    animationClass: "tier-anim-ruby",
  },
  diamond: {
    label: "Diamond",
    color: "transparent", // bị override bởi gradient text trong CSS
    bg: "#0a0a18",
    border: "transparent",
    animationClass: "tier-anim-diamond",
  },
  Ultimate_diamond: {
    label: "Ultimate Diamond",
    color: "transparent",
    bg: "#1a1200",
    border: "transparent",
    animationClass: "tier-anim-hkd",
  },
};
