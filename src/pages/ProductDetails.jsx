import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useProductDetails } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import AuroraHero from "@/components/premium/AuroraHero";

/* ✅ Public placeholder (DO NOT import) */
const PLACEHOLDER_IMAGE = "/placeholder.jpg";

export default function ProductDetails({ slug }) {
  const { data: rawProduct, isLoading } = useProductDetails(slug);

  // Unwrap usage if the API response wrapper persists
  const product = rawProduct?.result || rawProduct;

  const [bgImage, setBgImage] = useState(PLACEHOLDER_IMAGE);

  /* ✅ Preload image + fallback if broken or missing */
  useEffect(() => {
    if (!product) {
      setBgImage(PLACEHOLDER_IMAGE);
      return;
    }

    const src =
      product.product_images?.[0]?.image_path ||
      product.image;

    if (!src) {
      setBgImage(PLACEHOLDER_IMAGE);
      return;
    }

    const img = new Image();
    img.src = src;

    img.onload = () => setBgImage(src);
    img.onerror = () => setBgImage(PLACEHOLDER_IMAGE);
  }, [product]);

  /* =======================
     LOADING STATE
  ======================= */
  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-24">
        <Skeleton className="aspect-square w-full rounded-3xl mb-8" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
      </div>
    );
  }

  /* =======================
     NOT FOUND STATE
  ======================= */
  if (!product) {
    return (
      <>
        {/* Hero */}
        <AuroraHero
          title="Product Not Found"
          subtitle=""
          compact
          backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
        />

        <div className="container px-4 mx-auto py-24 flex flex-col items-center justify-center text-center">
          {/* Centered button */}
          <Button asChild className="mt-4">
            <Link href="/products">Return to Products</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <AuroraHero
        title={product.name}
        subtitle={product.category_name || "Product"}
        compact
        backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="container px-4 mx-auto py-24">
        {/* Back */}
        <Link
          href="/products"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* =======================
             PRODUCT IMAGE
          ======================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-3xl overflow-hidden border shadow-sm bg-secondary/20"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* =======================
             PRODUCT INFO
          ======================= */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase">
                {product.category_name || "Product"}
              </span>
              {product.brand && (
                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-bold uppercase">
                  {product.brand}
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                {product.name}
              </h1>
              {product.techname && (
                <h2 className="text-xl text-muted-foreground">
                  {product.techname}
                </h2>
              )}
            </div>

            {/* Key Details */}
            <div className="grid sm:grid-cols-2 gap-6 py-6 border-y">
              {product.targetapplication && (
                <div>
                  <h4 className="font-semibold text-sm uppercase text-primary mb-1">
                    Target Application
                  </h4>
                  <p className="text-muted-foreground">
                    {product.targetapplication}
                  </p>
                </div>
              )}
              {product.control && (
                <div>
                  <h4 className="font-semibold text-sm uppercase text-primary mb-1">
                    Control
                  </h4>
                  <p className="text-muted-foreground">
                    {product.control}
                  </p>
                </div>
              )}
              {product.dosage && (
                <div>
                  <h4 className="font-semibold text-sm uppercase text-primary mb-1">
                    Dosage
                  </h4>
                  <p className="text-muted-foreground">
                    {product.dosage}
                  </p>
                </div>
              )}
              {product.packingsize && (
                <div>
                  <h4 className="font-semibold text-sm uppercase text-primary mb-1">
                    Packing Size
                  </h4>
                  <p className="text-muted-foreground">
                    {product.packingsize}
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="font-bold text-xl mb-4">Key Features</h3>
                {product.features.split("\n").map((line, i) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1" />
                    <span className="text-muted-foreground">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            {product.description && !product.features && (
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
