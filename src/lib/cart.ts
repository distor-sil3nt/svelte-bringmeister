import { getFromApi } from "@/utils/api";

export const getCounts = async (): Promise<{ [key: string]: number }> => {
  const cart = await getFromApi().cart();

  return cart.products.reduce(
    (previous, product) => ({
      ...previous,
      [product.sku]: product.quantity
    }),
    {}
  );
};