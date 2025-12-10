import AboutLayout from "./AboutLayout"
import { motion } from "framer-motion"
import { Factory, FlaskConical, Truck } from "lucide-react"

const SECTIONS = [
    {
        title: "Manufacturing Units",
        desc: "We operate multiple manufacturing plants across Gujarat, capable of producing a wide range of formulations including EC, SC, SL, WP, WDG, and Granules. Our facilities are designed to meet international safety and environmental standards.",
        icon: <Factory className="h-6 w-6 text-primary" />,
        image: "https://images.unsplash.com/photo-1565514020176-dbf2277f026e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "R&D Center",
        desc: "Innovation is the backbone of our growth. Our dedicated Research & Development center is staffed by experienced scientists and agronomists who work tirelessly to develop new and improved formulations. The center is equipped with advanced analytical instruments for precise quality testing.",
        icon: <FlaskConical className="h-6 w-6 text-primary" />,
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Warehousing & Logistics",
        desc: "To ensure timely delivery of our products, we have established a vast network of warehouses strategically located across key agricultural regions. Our efficient logistics team ensures that our products reach even the remotest villages in perfect condition.",
        icon: <Truck className="h-6 w-6 text-primary" />,
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
    }
]

export default function Infrastructure() {
    return (
        <AboutLayout
            title="Infrastructure"
            subtitle="World-class facilities for world-class products."
            image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
        >
            <div className="max-w-3xl mx-auto text-center mb-16">
                <p className="text-xl leading-relaxed text-muted-foreground">
                    Our manufacturing units are equipped with the latest technology and machinery to ensure the production of high-quality agrochemicals. We have a robust infrastructure that supports our entire value chain, from raw material sourcing to final product distribution.
                </p>
            </div>

            <div className="space-y-24">
                {SECTIONS.map((section, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                    >
                        <div className="flex-1 space-y-6">
                            <div className="bg-primary/10 w-fit p-3 rounded-xl">
                                {section.icon}
                            </div>
                            <h3 className="text-3xl font-bold font-serif">{section.title}</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {section.desc}
                            </p>
                        </div>
                        <div className="flex-1">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video group">
                                <img
                                    src={section.image}
                                    alt={section.title}
                                    onError={(e) => (e.target.src = "https://placehold.co/800x500?text=Infrastructure")}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </AboutLayout>
    )
}
