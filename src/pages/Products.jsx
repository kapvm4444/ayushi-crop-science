import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/layout/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AuroraHero from "@/components/premium/AuroraHero";
import { motion } from "framer-motion";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { ChevronLeft, ChevronRight, Leaf, ArrowRight } from "lucide-react";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // Fetch Data
  const { data: products, isLoading: isProductsLoading } = useProducts(); // Fetch all items
  const { data: categories, isLoading: isCatsLoading } = useCategories();

  // Pagination Logic
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    if (!products) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Slugify Helper
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  return (
    <Layout>
      <AuroraHero
        title="Our Products"
        compact={true}
        backgroundImage="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop"
      />

      <div className="container px-4 mx-auto py-24 pt-32">
        {/* Category Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-8">Explore Our Range</h2>
          {isCatsLoading ? (
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-10 w-32 rounded-full" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <Button variant="premium" className="rounded-full px-6">
                All Products
              </Button>
              {categories?.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products/category/${slugify(cat.name)}`}
                >
                  <Button variant="outline" className="rounded-full px-6">
                    {cat.name}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Grid */}
        {isProductsLoading ? (
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
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-center gap-8">
              {paginatedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                  style={{ willChange: "opacity, transform" }}
                  className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] xl:w-[calc(25%-2rem)] min-w-[300px]"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                    <img
                      src={
                        product.product_images?.[0]?.image ||
                        "https://placehold.co/600x400?text=No+Image"
                      }
                      alt={product.name}
                      onError={(e) =>
                        (e.target.src =
                          "https://placehold.co/600x400?text=No+Image")
                      }
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">
                      {product.category_name || "Product"}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow">
                      {product.features ||
                        product.description ||
                        "No description available."}
                    </div>
                    <Link to={`/products/${product.id}`} className="mt-auto">
                      <Button className="w-full rounded-full" variant="premium">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

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
            <h2 className="text-2xl font-bold mb-2">No Products Available</h2>
            <p className="text-muted-foreground">
              Our catalog is currently being updated.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
