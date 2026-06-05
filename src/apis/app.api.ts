import { BASE_URL } from "./config";
const getCountOfUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/admin/count-of-users`);

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface ShopConfig {
  shopify_shop_name: string;
  shopify_gid: string;
  limit: number;
}

export const getShopAndCategoryLimitReturn = async (
  category: string,
): Promise<ShopConfig[]> => {
  try {
    alert(category);
    const response = await fetch(
      `${BASE_URL}/shop/shop-category-limit-return/${category}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    return data.data as ShopConfig[];
  } catch (error) {
    alert(error);
    return [];
  }
};
export const registerNewUser = async (username: string) => {
  try {
    await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
  } catch (error) {
    alert(error);
    throw error;
  }
};
export { getCountOfUsers };
