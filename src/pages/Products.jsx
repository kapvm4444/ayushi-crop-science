import { useState } from "react"
import { Link } from "react-router-dom"
import Layout from "@/layout/Layout"
import { Button } from "@/components/ui/button"
import AuroraHero from "@/components/premium/AuroraHero"
import { motion } from "framer-motion"

// Expanded dummy product data
const PRODUCTS_DATA = [
    { id: 1, name: "Super Kill 505", category: "Insecticides", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=2070&auto=format&fit=crop", desc: "Powerful insecticide for cotton and paddy." },
    { id: 2, name: "Weed Master", category: "Herbicides", image: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?q=80&w=2070&auto=format&fit=crop", desc: "Effective control of broadleaf weeds." },
    { id: 3, name: "Fungi Stop", category: "Fungicides", image: "https://images.unsplash.com/photo-1615811361269-669f43e3e2a9?q=80&w=2070&auto=format&fit=crop", desc: "Systemic fungicide for fruit crops." },
    { id: 4, name: "Growth Booster", category: "PGR", image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=2070&auto=format&fit=crop", desc: "Enhances plant growth and yield." },
    { id: 5, name: "Root Power", category: "Fertilizers", image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2096&auto=format&fit=crop", desc: "Promotes strong root development." },
    { id: 6, name: "Termite X", category: "Insecticides", image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop", desc: "Long-lasting termite control." },
    { id: 7, name: "Bio Shield", category: "Organic", image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop", desc: "100% organic crop protection." },
    { id: 8, name: "Yield Max", category: "PGR", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070&auto=format&fit=crop", desc: "Maximizes crop yield potential." },
    { id: 9, name: "Soil Gold", category: "Fertilizers", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop", desc: "Enriches soil with micronutrients." },
    { id: 10, name: "Pest Guard", category: "Insecticides", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop", desc: "Broad-spectrum pest control." },
    { id: 11, name: "Aqua Safe", category: "Herbicides", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2072&auto=format&fit=crop", desc: "Safe for aquatic environments." },
    { id: 12, name: "Leaf Shine", category: "Fungicides", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1527&auto=format&fit=crop", desc: "Prevents leaf spot diseases." },
]

const CATEGORIES_DATA = ["All", "Insecticides", "Herbicides", "Fungicides", "PGR", "Fertilizers", "Organic"]

export default function Products() {
    const [products] = useState(PRODUCTS_DATA)
    const [categories] = useState(CATEGORIES_DATA)
    const [activeCategory, setActiveCategory] = useState("All")

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory)

    return (
        <Layout>
            <AuroraHero
                title="Our Products"
                subtitle="Explore our wide range of crop protection and nutrition solutions designed for maximum yield."
                ctaText="Download Catalogue"
                ctaLink="#"
                secondaryCtaText="Contact Sales"
                secondaryCtaLink="/contact"
                backgroundImage="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop"
            />

            <div className="container px-4 mx-auto py-24 pt-32">
                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title">Explore Our Range</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={activeCategory === cat ? "premium" : "outline"}
                            onClick={() => setActiveCategory(cat)}
                            className="rounded-full px-6"
                        >
                            {cat}
                        </Button>
                    ))}
                </motion.div>

                {/* Product Grid */}
                <div className="flex flex-wrap justify-center gap-8">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] xl:w-[calc(25%-2rem)] min-w-[280px]"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-6">
                                <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">
                                    {product.category}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                                    {product.desc}
                                </p>
                                <Link to={`/products/${product.id}`}>
                                    <Button className="w-full rounded-full" variant="premium">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
