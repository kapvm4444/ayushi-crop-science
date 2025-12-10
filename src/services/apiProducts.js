import { getDataByEndpoint } from "@/services/getData.js";

// Fetch Categories
export async function getCategories() {
  return await getDataByEndpoint("category/list", {}, "categories");
}

// Fetch Products (can be filtered by category_id)
export async function getProducts(categoryId) {
  const payload = categoryId ? { category_id: categoryId } : {};
  return await getDataByEndpoint("product/list", payload, "products");
}

export async function getProductById(productId) {
  return await getDataByEndpoint("frontend/productDetail", {
    id: productId,
  });
}
