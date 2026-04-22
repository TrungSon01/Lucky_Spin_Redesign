import { ProductCard } from "@shopify/shop-minis-react";
import useBeautyResult from "./Hooks/useBeautyResult";

export default function BeautyResult() {
  const { beauty_result } = useBeautyResult();
  return (
    <div>
      <h1>Beauty Result</h1>
      <ul>
        {beauty_result.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
