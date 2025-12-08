import { useParams } from "react-router-dom";
import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dummy data - in a real app, this would come from an API or central store
const PRODUCTS_DB = {
    insecticides: [
        { id: 1, name: "Cropshooter 505", type: "Insecticide", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=2070&auto=format&fit=crop", desc: "Potent protection against sucking pests." },
        { id: 2, name: "PestOff 100", type: "Insecticide", image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop", desc: "Broad spectrum control for all crops." },
    ],
    herbicides: [
        { id: 3, name: "WeedClear X", type: "Herbicide", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop", desc: "Effective against broadleaf weeds." },
    ],
    fungicides: [
        { id: 4, name: "FungiGuard Pro", type: "Fungicide", image: "https://images.unsplash.com/photo-1565514020176-dbf2277f026e?q=80&w=2070&auto=format&fit=crop", desc: "Prevents and cures fungal infections." },
    ],
    pgr: [
        { id: 5, name: "GrowMax", type: "PGR", image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop", desc: "Boosts plant growth and yield." },
    ],
    "bio-fertilizers": [
        { id: 6, name: "EcoNutrient", type: "Bio-Fertilizer", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop", desc: "Enriches soil naturally." },
    ],
    organic: [
        { id: 7, name: "OrganoLife", type: "Organic", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop", desc: "100% organic crop protection." },
    ],
};

const CATEGORY_TITLES = {
    insecticides: "Insecticides",
    herbicides: "Herbicides",
    fungicides: "Fungicides",
    pgr: "Plant Growth Regulators",
    "bio-fertilizers": "Bio-Fertilizers",
    organic: "Organic Products",
};

export default function ProductCategory() {
    const { category } = useParams();
    const products = PRODUCTS_DB[category] || [];
    const title = CATEGORY_TITLES[category] || "Our Products";

    return (
        <Layout>
            <AuroraHero
                title={title}
                compact={true}
                backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
            />

            <div className="container px-4 mx-auto py-24">
                {products.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-8">
                        {products.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group bg-card border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px]"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                                        {product.type}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-muted-foreground mb-6">{product.desc}</p>
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                                    >
                                        View Details <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <Leaf className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
                        <p className="text-muted-foreground">
                            We are currently updating our {title} catalog. Check back soon!
                        </p>
                        <Button asChild className="mt-8">
                            <Link to="/products">View All Products</Link>
                        </Button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
