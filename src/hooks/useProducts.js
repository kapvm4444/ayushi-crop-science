import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/services/apiProducts.js";

// Hook for Categories
export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: 10 * 60 * 1000,
    });
}

// Hook for Products (Optional Category dependency)
export function useProducts(categoryId = null) {
    return useQuery({
        queryKey: ["products", categoryId],
        queryFn: () => getProducts(categoryId),
        // If we want to allow fetching ALL products when no category is selected, keep enabled true.
        // If strict dependency, enabled: !!categoryId.
        // User description: "based on category_id ... get products passed on this category".
        // Dealer form needs products. Likely ALL products or filtered.
        // Actually, Step 1050 "product_id" input. Usually dealers select from a list.
        // I'll assume we fetch all if categoryId is null, or filter if present.
        staleTime: 5 * 60 * 1000,
    });
}
