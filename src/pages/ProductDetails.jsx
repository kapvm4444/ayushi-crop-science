import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import Layout from "@/layout/Layout"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, ShoppingCart, Share2 } from "lucide-react"

// Expanded dummy product data (matching Products.jsx)
const PRODUCTS_DATA = [
    { id: 1, name: "Super Kill 505", category: "Insecticides", price: "₹450 / Liter", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=2070&auto=format&fit=crop", desc: "Powerful insecticide for cotton and paddy.", description: "Super Kill 505 is a broad-spectrum insecticide that controls a wide range of pests in various crops. It is highly effective against bollworms, stem borers, and leaf folders.", features: ["Broad-spectrum control", "Quick knockdown effect", "Long-lasting protection", "Safe for beneficial insects"] },
    { id: 2, name: "Weed Master", category: "Herbicides", price: "₹350 / Liter", image: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?q=80&w=2070&auto=format&fit=crop", desc: "Effective control of broadleaf weeds.", description: "Weed Master is a selective herbicide for the control of broadleaf weeds in wheat and maize. It is safe for the crop and highly effective against resistant weeds.", features: ["Selective action", "Systemic control", "Rainfast within 1 hour", "No residual effect"] },
    { id: 3, name: "Fungi Stop", category: "Fungicides", price: "₹550 / Kg", image: "https://images.unsplash.com/photo-1615811361269-669f43e3e2a9?q=80&w=2070&auto=format&fit=crop", desc: "Systemic fungicide for fruit crops.", description: "Fungi Stop is a broad-spectrum systemic fungicide with protective and curative action. It controls a wide range of fungal diseases in fruits and vegetables.", features: ["Systemic and contact action", "Preventive and curative", "Low pre-harvest interval", "Excellent crop safety"] },
    { id: 4, name: "Growth Booster", category: "PGR", price: "₹800 / Liter", image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=2070&auto=format&fit=crop", desc: "Enhances plant growth and yield.", description: "Growth Booster is a plant growth regulator that stimulates cell division and elongation. It improves fruit setting, size, and quality.", features: ["Stimulates growth", "Increases yield", "Improves quality", "Reduces flower drop"] },
    { id: 5, name: "Root Power", category: "Fertilizers", price: "₹250 / Kg", image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2096&auto=format&fit=crop", desc: "Promotes strong root development.", description: "Root Power is a specialized fertilizer that promotes vigorous root development and nutrient uptake. It is essential for early crop establishment.", features: ["Enhances root growth", "Improves nutrient uptake", "Boosts stress tolerance", "Easy application"] },
    { id: 6, name: "Termite X", category: "Insecticides", price: "₹600 / Liter", image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop", desc: "Long-lasting termite control.", description: "Termite X provides long-lasting protection against termites in buildings and agriculture. It creates a treated zone that termites cannot penetrate.", features: ["Long residual effect", "Odorless formula", "Non-repellent", "Effective at low dose"] },
    { id: 7, name: "Bio Shield", category: "Organic", price: "₹400 / Liter", image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop", desc: "100% organic crop protection.", description: "Bio Shield is a certified organic crop protector derived from botanical extracts. It repels pests and boosts plant immunity.", features: ["Certified organic", "Zero residue", "Safe for pollinators", "Multi-pest control"] },
    { id: 8, name: "Yield Max", category: "PGR", price: "₹900 / Liter", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070&auto=format&fit=crop", desc: "Maximizes crop yield potential.", description: "Yield Max is an advanced plant bio-stimulant that maximizes the genetic potential of crops. It enhances photosynthesis and nutrient assimilation.", features: ["Maximizes yield", "Improves stress resistance", "Enhances photosynthesis", "Compatible with other inputs"] },
    { id: 9, name: "Soil Gold", category: "Fertilizers", price: "₹300 / Kg", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop", desc: "Enriches soil with micronutrients.", description: "Soil Gold is a micronutrient mixture that corrects deficiencies and improves soil fertility. It ensures balanced nutrition for healthy crop growth.", features: ["Corrects deficiencies", "Improves soil health", "Balanced nutrition", "Higher productivity"] },
    { id: 10, name: "Pest Guard", category: "Insecticides", price: "₹480 / Liter", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop", desc: "Broad-spectrum pest control.", description: "Pest Guard is a versatile insecticide for the control of sucking and chewing pests. It offers quick knockdown and long residual activity.", features: ["Broad spectrum", "Quick action", "Cost-effective", "Rainfast"] },
    { id: 11, name: "Aqua Safe", category: "Herbicides", price: "₹420 / Liter", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2072&auto=format&fit=crop", desc: "Safe for aquatic environments.", description: "Aqua Safe is a specialized herbicide for aquatic weed control. It effectively manages weeds without harming fish or other aquatic life.", features: ["Aquatic safe", "Effective weed control", "Low toxicity", "Biodegradable"] },
    { id: 12, name: "Leaf Shine", category: "Fungicides", price: "₹520 / Kg", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1527&auto=format&fit=crop", desc: "Prevents leaf spot diseases.", description: "Leaf Shine is a contact fungicide that prevents and controls leaf spot diseases. It improves leaf quality and photosynthetic activity.", features: ["Preventive action", "Improves leaf quality", "Broad disease control", "Easy to mix"] },
]

export default function ProductDetails() {
    const { id } = useParams()
    const [products] = useState(PRODUCTS_DATA)

    const getProduct = (id) => {
        return products.find(p => p.id === parseInt(id)) || products[0]
    }

    const product = getProduct(id)

    return (
        <Layout>
            <div className="container px-4 mx-auto py-24">
                <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-square bg-secondary/20 rounded-3xl overflow-hidden border shadow-sm"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <div className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                                {product.category}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
                            <p className="text-2xl font-semibold text-foreground/80">{product.price}</p>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Key Features</h3>
                            <ul className="space-y-3">
                                {product.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex gap-4 pt-6 border-t">
                            <Button size="lg" className="flex-1 text-lg h-14 rounded-full">
                                <ShoppingCart className="mr-2 h-5 w-5" /> Order Now
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 w-14 rounded-full p-0">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    )
}
