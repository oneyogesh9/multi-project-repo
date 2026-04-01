import { Product } from "../types";

const BASE_URL = "https://fakestoreapi.com";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Product fetch failed");
  }

  const data = await response.json();
  return data;
};

export const createProduct = async (
  product: Omit<Product, "id" | "rating">,
): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...product, rating: { rate: 0, count: 0 } }),
  });
  if (!response.ok) {
    throw new Error("Create product failed");
  }
  const newProduct = await response.json();
  return newProduct;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Update product failed");
  }
  const updated = await response.json();
  return updated;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Delete product failed");
  }
};
