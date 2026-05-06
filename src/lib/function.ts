import { TIER_CONFIG } from "../Pages/Account/Data/level";

export function process_name(name: string): string {
  if (!name) return "";

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  const first = words[0][0];
  const last = words[words.length - 1][0];

  return (first + last).toUpperCase();
}

export const transfer_to_vnd = (amount: number) => {
  return amount * 26400;
};

export const formatDate = (dateString: string) => {
  const d = new Date(dateString);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}:${month}:${year}`;
};

// Helper: format last_online timestamp to relative time
export function formatLastOnline(timestamp: string | null): string {
  if (!timestamp) return "Never";
  const now = Date.now();
  const diff = now - parseInt(timestamp, 10);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

// Helper: calculate tier from rank
export function getTierByRank(rank: number) {
  if (rank <= 3) return TIER_CONFIG.bronze;
  if (rank <= 10) return TIER_CONFIG.silver;
  if (rank <= 20) return TIER_CONFIG.gold;
  if (rank <= 50) return TIER_CONFIG.ruby;
  if (rank > 50 && rank <= 100) {
    const tier = { ...TIER_CONFIG.diamond };
    const level = Math.ceil((rank - 50) / 10);
    const roman = ["I", "II", "III", "IV", "V"];
    tier.label = `Diamond ${roman[level - 1]}`;
    return tier;
  }
  if (rank > 100) {
    return { ...TIER_CONFIG.Ultimate_diamond, label: "Ultimate Diamond" };
  }
  return null;
}
