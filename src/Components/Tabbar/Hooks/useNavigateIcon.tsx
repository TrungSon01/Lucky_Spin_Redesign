import { Home, Heart, ShoppingBag, User } from "lucide-react";

interface Tab {
  path: string;
  label: string;
  badge?: number;
  icon: (active: boolean) => React.ReactNode;
}

export default function useNavigateIcon() {
  const TABS_LEFT: Tab[] = [
    {
      path: "/main",
      label: "Home",
      icon: (active) => (
        <Home
          size={22}
          strokeWidth={active ? 2.2 : 1.7}
          fill={active ? "currentColor" : "none"}
          className="tab-icon"
        />
      ),
    },
    {
      path: "/favorites",
      label: "Favorites",
      icon: (active) => (
        <Heart
          size={22}
          strokeWidth={active ? 2.2 : 1.7}
          fill={active ? "currentColor" : "none"}
          className="tab-icon"
        />
      ),
    },
  ];

  const TABS_RIGHT: Tab[] = [
    {
      path: "/cart",
      label: "Cart",
      badge: 3,
      icon: (active) => (
        <ShoppingBag
          size={22}
          strokeWidth={active ? 2.2 : 1.7}
          fill={active ? "currentColor" : "none"}
          className="tab-icon"
        />
      ),
    },
    {
      path: "/account",
      label: "Account",
      icon: (active) => (
        <User
          size={22}
          strokeWidth={active ? 2.2 : 1.7}
          fill={active ? "currentColor" : "none"}
          className="tab-icon"
        />
      ),
    },
  ];

  return { TABS_LEFT, TABS_RIGHT };
}
