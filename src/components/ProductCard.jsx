"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const placeholder = "/placeholder.jpg"; // Handle placeholder correctly

export function ProductCard({ product, index }) {
    const [bgImage, setBgImage] = useState(placeholder);

    useEffect(() => {
        if (!product) return;

        const src =
            product.image ||
            product.product_images?.[0]?.image ||
            product.product_images?.[0]?.image_path;

        if (!src) {
            setBgImage(placeholder);
            return;
        }

        const img = new Image();
        img.src = src;
        img.onload = () => setBgImage(src);
        img.onerror = () => setBgImage(placeholder);
    }, [product]);

    // Use product.slug if available, otherwise fallback to name-id (legacy) or just name
    const slug = product.slug || `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${product.id}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
            style={{ willChange: "opacity, transform" }}
            className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full w-full"
        >
            <Link
                href={`/products/${slug}`}
                className="flex flex-col h-full"
            >
                {/* Image Section */}
                <div
                    className="aspect-[4/3] overflow-hidden bg-white/75 relative shrink-0 transition-transform duration-500 group-hover:scale-105"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {product.brand && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
                            {product.brand}
                        </div>
                    )}
                </div>

                {/* Content Section */}
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
                    <Button className="w-full rounded-full mt-auto" size="default">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </Link>
        </motion.div>
    );
}
