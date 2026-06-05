// useShopCategoryConfig.ts
import { useState, useEffect } from "react";
import { getShopAndCategoryLimitReturn } from "../../../apis/app.api";
interface ShopConfig {
  shopify_gid: string;
  shopify_shop_name: string;
  limit: number;
}

export function useShopCategoryConfig(category: string) {
  const [shops, setShops] = useState<ShopConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    setError(null);

    getShopAndCategoryLimitReturn(category)
      .then((data: ShopConfig[]) => {
        setShops(data ?? []);
      })
      .catch((err) =>
        setError(err instanceof Error ? err : new Error(String(err))),
      )
      .finally(() => setLoading(false));
  }, [category]);

  return { shops, loading, error };
}
