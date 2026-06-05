// useMultiShopProducts.ts
import { useProductSearch } from "@shopify/shop-minis-react";
import { useMemo } from "react";

interface ShopConfig {
  shopify_gid: string;
  shopify_shop_name: string;
  limit: number;
}
function useShopSlot(shop: ShopConfig | undefined, query: string) {
  const result = useProductSearch({
    query: `${query} ${shop?.shopify_shop_name ?? ""}`.trim(),
    first: 50,
    fetchPolicy: "network-only",
    skip: !shop,
  });

  const filteredProducts = useMemo(() => {
    if (!result.products) return null;

    const limit = shop?.limit ?? 1;

    // sản phẩm có discount → sort theo % giảm giá cao nhất
    const discounted = result.products
      .filter((p) => {
        if (!p.compareAtPrice) return false;
        return p.compareAtPrice.amount !== p.price.amount;
      })
      .sort((a, b) => {
        // % giảm = (compareAtPrice - price) / compareAtPrice * 100
        const discountA =
          (Number(a.compareAtPrice!.amount) - Number(a.price.amount)) /
          Number(a.compareAtPrice!.amount);
        const discountB =
          (Number(b.compareAtPrice!.amount) - Number(b.price.amount)) /
          Number(b.compareAtPrice!.amount);
        return discountB - discountA; // ✅ giảm nhiều nhất lên đầu
      });

    // đủ limit → trả về luôn
    if (discounted.length >= limit) return discounted.slice(0, limit);

    // thiếu → bù thêm sản phẩm không discount (random)
    const discountedIds = new Set(discounted.map((p) => p.id));
    const fallback = result.products
      .filter((p) => !discountedIds.has(p.id))
      .slice(0, limit - discounted.length);

    return [...discounted, ...fallback];
  }, [result.products, shop?.limit]);

  return { ...result, products: filteredProducts };
}
export function useMultiShopProducts(shops: ShopConfig[], query: string) {
  const slot0 = useShopSlot(shops[0], query);
  const slot1 = useShopSlot(shops[1], query);
  const slot2 = useShopSlot(shops[2], query);
  const slot3 = useShopSlot(shops[3], query);
  const slot4 = useShopSlot(shops[4], query);
  const slot5 = useShopSlot(shops[5], query);
  const slot6 = useShopSlot(shops[6], query);
  const slot7 = useShopSlot(shops[7], query);
  const slot8 = useShopSlot(shops[8], query);
  const slot9 = useShopSlot(shops[9], query);

  const allSlots = [
    slot0,
    slot1,
    slot2,
    slot3,
    slot4,
    slot5,
    slot6,
    slot7,
    slot8,
    slot9,
  ];
  const activeSlots = allSlots.slice(0, shops.length);

  const loading = activeSlots.some((r) => r.loading);
  const error = activeSlots.find((r) => r.error)?.error ?? null;
  const products = useMemo(
    () => (loading ? null : activeSlots.flatMap((r) => r.products ?? [])),
    [loading, ...activeSlots.map((r) => r.products)],
  );

  return { products, loading, error };
}
