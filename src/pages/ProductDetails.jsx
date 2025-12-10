import { useParams, Link } from "react-router-dom";
import Layout from "@/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useProductDetails } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetails() {
  const { id } = useParams();

  // Fetch all products and find the matching one
  // In a larger app, we'd want a specific endpoint for single product
  const { data: product, isLoading } = useProductDetails(id);

  console.log(product); //product details objexpct

  if (isLoading) {
    return (
      <Layout>
        {/* Hero Background */}
        <div className="relative w-full h-[40vh] min-h-[300px] bg-gradient-to-br from-primary/20 via-secondary/30 to-primary/10 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container px-4 mx-auto relative z-10 text-center">
            <Skeleton className="h-12 w-64 mx-auto" />
          </div>
        </div>

        <div className="container px-4 mx-auto py-24">
          <div className="mb-8">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <Skeleton className="aspect-square w-full rounded-3xl" />
            <div className="space-y-8">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-32 w-full" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        {/* Hero Background */}
        <div className="relative w-full h-[40vh] min-h-[300px] bg-gradient-to-br from-primary/20 via-secondary/30 to-primary/10 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container px-4 mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">
              Product Not Found
            </h1>
          </div>
        </div>

        <div className="container py-32 text-center">
          <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
          <Button asChild>
            <Link to="/products">Return to All Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Background with Product Category */}
      <div className="relative w-full h-[40vh] min-h-[300px] bg-gradient-to-br from-primary/20 via-secondary/30 to-primary/10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        <div className="container px-4 mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary font-bold mb-4">
              {product.category_name || "Product"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {product.name}
            </h1>
            {product.techname && (
              <p className="text-xl text-muted-foreground">
                {product.techname}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container px-4 mx-auto py-24">
        <Link
          to="/products"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square bg-secondary/20 rounded-3xl overflow-hidden border shadow-sm group"
          >
            <img
              src={
                product.product_images?.[0]?.image_path ||
                "https://placehold.co/600x600?text=No+Image"
              }
              alt={product.name}
              onError={(e) =>
                (e.target.src = "https://placehold.co/600x600?text=No+Image")
              }
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                  {product.category_name || "Product"}
                </span>
                {product.brand && (
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-bold uppercase tracking-wider">
                    {product.brand}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gradient">
                {product.name}
              </h1>
              {product.techname && (
                <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-4">
                  {product.techname}
                </h2>
              )}
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 py-6 border-y border-border/50">
              {product.targetapplication && (
                <div>
                  <h4 className="font-semibold text-sm text-primary uppercase mb-2">
                    Target Crops
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.targetapplication}
                  </p>
                </div>
              )}
              {product.control && (
                <div>
                  <h4 className="font-semibold text-sm text-primary uppercase mb-2">
                    Target Pests/Weeds
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.control}
                  </p>
                </div>
              )}
              {product.dosage && (
                <div>
                  <h4 className="font-semibold text-sm text-primary uppercase mb-2">
                    Recommended Dosage
                  </h4>
                  <p className="text-muted-foreground font-medium">
                    {product.dosage}
                  </p>
                </div>
              )}
              {product.packingsize && (
                <div>
                  <h4 className="font-semibold text-sm text-primary uppercase mb-2">
                    Packing Size
                  </h4>
                  <p className="text-muted-foreground font-medium">
                    {product.packingsize}
                  </p>
                </div>
              )}
            </div>

            {product.features && (
              <div className="space-y-4">
                <h3 className="font-bold text-xl">Key Features</h3>
                <div className="prose prose-sm text-muted-foreground">
                  {product.features.split("\n").map((line, i) => (
                    <div key={i} className="flex gap-3 items-start mb-2 group">
                      <div className="mt-1 shrink-0 p-1 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="leading-relaxed">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description fallback if features or details are sparse, or as intro */}
            {product.description && !product.features && (
              <div className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </div>
            )}

            {/* No Enquire Button as requested */}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
