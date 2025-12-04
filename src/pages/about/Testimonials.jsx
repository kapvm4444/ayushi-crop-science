import AboutLayout from "./AboutLayout"
import { Star, Quote, User } from "lucide-react"
import { motion } from "framer-motion"

const TESTIMONIALS = [
    {
        name: "Ram Lal",
        location: "Punjab",
        text: "I have been using Ayushi Crop Science products for the last 5 years. Their 'Super Kill' insecticide saved my cotton crop from bollworm attack. Highly recommended!",
        rating: 5,
        role: "Cotton Farmer"
    },
    {
        name: "Suresh Patel",
        location: "Gujarat",
        text: "The technical team from Ayushi visited my farm and guided me on proper fertilizer application. My groundnut yield increased by 20% this season.",
        rating: 5,
        role: "Groundnut Farmer"
    },
    {
        name: "Anita Devi",
        location: "Haryana",
        text: "Quality products at affordable prices. Their customer service is also very helpful. I use their organic range for my vegetable farm.",
        rating: 4,
        role: "Organic Farmer"
    },
    {
        name: "Vikram Singh",
        location: "Madhya Pradesh",
        text: "Best fungicides in the market. Saved my soybean crop from rust. The results were visible within 3 days of application.",
        rating: 5,
        role: "Soybean Farmer"
    },
    {
        name: "Meena Kumari",
        location: "Uttar Pradesh",
        text: "I appreciate their commitment to educating farmers. The Kisan Mela organized by them was very informative.",
        rating: 5,
        role: "Wheat Farmer"
    },
    {
        name: "Rajesh Kumar",
        location: "Maharashtra",
        text: "Reliable and effective. I have been a loyal customer for 10 years now.",
        rating: 4,
        role: "Sugarcane Farmer"
    }
]

export default function Testimonials() {
    return (
        <AboutLayout
            title="Testimonials"
            subtitle="Hear from the farmers who trust us."
            image="https://images.unsplash.com/photo-1595839088656-787c886c965e?q=80&w=2070&auto=format&fit=crop"
        >
            <div className="max-w-3xl mx-auto text-center mb-16">
                <p className="text-xl leading-relaxed text-muted-foreground">
                    Our success is measured by the success of our farmers. Here are some stories from the field that inspire us to work harder every day.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                        <Quote className="h-10 w-10 text-primary/20 mb-6" />
                        <p className="text-lg italic mb-6 flex-grow leading-relaxed">&quot;{t.text}&quot;</p>

                        <div className="flex items-center gap-4 mt-auto pt-6 border-t">
                            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                                <User className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                                <h4 className="font-bold">{t.name}</h4>
                                <p className="text-xs text-primary font-medium uppercase tracking-wider">{t.role}, {t.location}</p>
                            </div>
                        </div>
                        <div className="flex gap-1 mt-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </AboutLayout>
    )
}
