import AboutLayout from "./AboutLayout"
import { CheckCircle, FlaskConical, Truck, Award, Leaf, Headphones } from "lucide-react"
import { motion } from "framer-motion"

const USPS = [
    {
        title: "State-of-the-art Manufacturing",
        desc: "Advanced facilities ensuring highest purity and potency standards.",
        icon: <FlaskConical className="h-8 w-8 text-primary" />,
        className: "md:col-span-2"
    },
    {
        title: "In-house R&D Center",
        desc: "Recognized by Govt. of India for breakthrough innovations.",
        icon: <Award className="h-8 w-8 text-primary" />,
        className: "md:col-span-1"
    },
    {
        title: "Pan-India Network",
        desc: "Reaching the remotest corners with our strong distribution chain.",
        icon: <Truck className="h-8 w-8 text-primary" />,
        className: "md:col-span-1"
    },
    {
        title: "Certified Products",
        desc: "Wide range of ISO and Organic certified solutions.",
        icon: <CheckCircle className="h-8 w-8 text-primary" />,
        className: "md:col-span-2"
    },
    {
        title: "Sustainability",
        desc: "Eco-friendly formulations safe for soil and water.",
        icon: <Leaf className="h-8 w-8 text-primary" />,
        className: "md:col-span-1"
    },
    {
        title: "Expert Support",
        desc: "24/7 technical guidance for farmers and dealers.",
        icon: <Headphones className="h-8 w-8 text-primary" />,
        className: "md:col-span-1"
    }
]

export default function USP() {
    return (
        <AboutLayout
            title="Our USP"
            subtitle="What sets Ayushi Crop Science apart from the rest."
            image="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop"
        >
            <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="text-xl leading-relaxed text-muted-foreground">
                    In a crowded market, we stand out through our unwavering commitment to quality and innovation. Here is why farmers and dealers choose us:
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {USPS.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-card border p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group ${item.className}`}
                    >
                        <div className="bg-primary/10 w-fit p-4 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 bg-secondary/20 rounded-3xl p-12 text-center">
                <h3 className="text-2xl font-bold font-serif mb-4">More Than Just Products</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We don&apos;t just sell products; we provide complete crop solutions. Our team of experts works closely with farmers to understand their specific needs and recommend the right products for their crops and soil conditions.
                </p>
            </div>
        </AboutLayout>
    )
}
