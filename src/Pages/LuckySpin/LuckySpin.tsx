import { useProductSearch } from "@shopify/shop-minis-react";

export default function LuckySpin() {
  const { products } = useProductSearch({
    query: "s",
  });
  return <div></div>;
}
