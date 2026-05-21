import { useSavedProducts } from "@shopify/shop-minis-react";
import { useEffect, useMemo, useState } from "react";
import { getTierByRank } from "../../../lib/function";
import { useLocalZustand } from "../../../zustand/app.useLocalZustand";
export default function useDataAccount() {
  const { products: wishlist } = useSavedProducts({
    first: 499,
    fetchPolicy: "network-only",
  });

  const [userRank, setUserRank] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<string>("0");
  const [roundsPlayed, setRoundsPlayed] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(true);
  const [showAllWishlist, setShowAllWishlist] = useState(false);
  const zustandData = useLocalZustand((s) => s.state);
  const { user_name, user_avatar, achievement_first_purchase } =
    useLocalZustand().state;

  useEffect(() => {
    setIsLoading(true);

    try {
      const streakVal = zustandData.current_streak
        ? parseInt(zustandData.current_streak, 10)
        : 0;

      const roundsVal = zustandData.rounds_played
        ? parseInt(zustandData.rounds_played, 10)
        : 0;

      const safeStreak = isNaN(streakVal) ? 0 : streakVal;
      const safeRounds = isNaN(roundsVal) ? 0 : roundsVal;

      setCurrentStreak(String(safeStreak));
      setRoundsPlayed(String(safeRounds));

      const rank = Math.floor(
        safeStreak < 100 ? safeStreak / 10 + safeRounds : 15 + safeRounds,
      );

      setUserRank(rank);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [zustandData]);

  const tier = useMemo(() => getTierByRank(userRank), [userRank]);

  // Calculate points needed for next tier
  const rankProgress = useMemo(() => {
    if (userRank >= 101) {
      return {
        currentRank: userRank,
        nextTier: null,
        pointsNeeded: 0,
        isMaxTier: true,
      };
    }

    let nextThreshold: number;
    let nextTierName: string;

    if (userRank < 4) {
      nextThreshold = 4;
      nextTierName = "Silver";
    } else if (userRank < 11) {
      nextThreshold = 11;
      nextTierName = "Gold";
    } else if (userRank < 21) {
      nextThreshold = 21;
      nextTierName = "Ruby";
    } else if (userRank < 51) {
      nextThreshold = 51;
      nextTierName = "Diamond";
    } else {
      // userRank < 101 at this point
      nextThreshold = 101;
      nextTierName = "Ultimate Diamond";
    }

    return {
      currentRank: userRank,
      nextTier: nextTierName,
      pointsNeeded: nextThreshold - userRank,
      isMaxTier: false,
    };
  }, [userRank]);

  // Calculate current season (updates every 3 months: Jan 1, Apr 1, Jul 1, Oct 1)
  const seasonInfo = useMemo(() => {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const year = now.getFullYear();

    let seasonNumber: number;
    let seasonName: string;
    let nextSeasonStart: Date;

    // Determine current season based on month
    // Season 1: Jan - Mar (starts Jan 1)
    // Season 2: Apr - Jun (starts Apr 1)
    // Season 3: Jul - Sep (starts Jul 1)
    // Season 4: Oct - Dec (starts Oct 1)
    if (month >= 0 && month <= 2) {
      // Jan-Mar
      seasonNumber = 1;
      seasonName = "Spring";
      nextSeasonStart = new Date(year, 3, 1); // Apr 1
    } else if (month >= 3 && month <= 5) {
      // Apr-Jun
      seasonNumber = 2;
      seasonName = "Summer";
      nextSeasonStart = new Date(year, 6, 1); // Jul 1
    } else if (month >= 6 && month <= 8) {
      // Jul-Sep
      seasonNumber = 3;
      seasonName = "Autumn";
      nextSeasonStart = new Date(year, 9, 1); // Oct 1
    } else {
      // Oct-Dec
      seasonNumber = 4;
      seasonName = "Winter";
      nextSeasonStart = new Date(year + 1, 0, 1); // Jan 1 next year
    }

    // Calculate days until next season
    const daysRemaining = Math.ceil(
      (nextSeasonStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    return {
      number: seasonNumber,
      name: seasonName,
      nextStart: nextSeasonStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      daysRemaining: Math.max(0, daysRemaining),
    };
  }, []);

  // Format stats
  const formattedStreak = useMemo(() => {
    const num = parseInt(currentStreak, 10);
    return isNaN(num) ? 0 : num;
  }, [currentStreak]);

  const formattedRounds = useMemo(() => {
    const num = parseInt(roundsPlayed, 10);
    return isNaN(num) ? 0 : num;
  }, [roundsPlayed]);

  // Avatar display
  const displayName = user_name || "Guest";
  const avatarUrl = user_avatar;

  return {
    tier,
    rankProgress,
    seasonInfo,
    formattedStreak,
    formattedRounds,
    avatarUrl,
    displayName,
    isLoading,
    wishlist: wishlist || [],
    showAllWishlist,
    setShowAllWishlist,
    purchase: achievement_first_purchase || 0,
  };
}
