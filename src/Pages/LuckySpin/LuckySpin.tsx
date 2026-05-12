import { Product, useProductSearch } from "@shopify/shop-minis-react";
import { useEffect, useState } from "react";

export default function LuckySpin() {
  const [list_product, set_list_product] = useState<Product[]>([]);
  const { products } = useProductSearch({
    query: "skirt",
    first: 10,
    filters: {
      gender: "FEMALE",
    },
  });
  useEffect(() => {
    if (products) {
      set_list_product(products);
    }
  }, [products]);

  return (
    <div>
      {list_product.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <img
            src={product.featuredImage?.url}
            alt={product.title}
            width={100}
          />
        </div>
      ))}
    </div>
  );
}
