"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
// import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { ArrowRight, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { ProductCardGroup } from "@/components/products/ProductCardGroup";

export default function ProductCategory() {
  const params = useParams();
  const categorySlug = params?.categoryId;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Fetch Categories to match slug to ID
  const { data: categories, isLoading: isCatsLoading } = useCategories();

  // Find current category based on slug
  function slugify(text) {
    return (
      text
        ?.toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "") || ""
    ); // Trim - from end of text
  }

  const currentCategory = useMemo(() => {
    return categories?.find((c) => slugify(c.name) === categorySlug);
  }, [categories, categorySlug]);

  // Fetch products for this category
  const { data: products, isLoading: isProductsLoading } = useProducts(
    currentCategory?.id,
  );

  const title = currentCategory?.name || "Our Products";

  // Pagination Logic
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    if (!products) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, currentPage]);

  // Ensure products have the category name for the card
  const displayProducts = useMemo(() => {
    if (!currentCategory) return paginatedProducts;
    return paginatedProducts.map(p => ({
      ...p,
      category_name: currentCategory.name
    }));
  }, [paginatedProducts, currentCategory]);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Loading State with Skeletons
  if (isCatsLoading || (currentCategory && isProductsLoading)) {
    return (
      <>
        <AuroraHero
          title="Loading Products..."
          compact={true}
          backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
        />
        <div className="container px-4 mx-auto py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="flex flex-col space-y-3 rounded-2xl border p-4"
              >
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full rounded-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // Not Found State
  if (!isCatsLoading && !currentCategory) {
    return (
      <>
        <div className="container py-32 text-center">
          <h2 className="text-3xl font-bold mb-4">Category Not Found</h2>
          <Button asChild>
            <Link href="/products">Return to All Products</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <AuroraHero
        title={title}
        compact={true}
        backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="container px-4 mx-auto py-24">
        {displayProducts.length > 0 ? (
          <>
            <ProductCardGroup products={displayProducts} />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <Leaf className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
            <p className="text-muted-foreground">
              We are currently updating our {title} catalog. Check back soon!
            </p>
            <Button asChild className="mt-8">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
