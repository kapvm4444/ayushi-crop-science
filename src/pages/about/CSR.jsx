import AboutLayout from "./AboutLayout"
import { motion } from "framer-motion"
import { Heart, BookOpen, Stethoscope, Sprout } from "lucide-react"

const INITIATIVES = [
    {
        title: "Farmer Education",
        desc: "Organizing 'Kisan Melas' and workshops to educate farmers on modern techniques.",
        icon: <Sprout className="h-6 w-6 text-primary" />,
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Rural Healthcare",
        desc: "Free medical camps providing checkups and medicines to underprivileged communities.",
        icon: <Stethoscope className="h-6 w-6 text-primary" />,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Education Support",
        desc: "Providing infrastructure and scholarships to schools in rural areas.",
        icon: <BookOpen className="h-6 w-6 text-primary" />,
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop"
    }
]

export default function CSR() {
    return (
        <AboutLayout
            title="CSR Activities"
            subtitle="Giving back to the community that sustains us."
            image="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop"
        >
            <div className="max-w-3xl mx-auto text-center mb-16">
                <p className="text-xl leading-relaxed text-muted-foreground">
                    Corporate Social Responsibility (CSR) is an integral part of our business ethos. We believe in growing together with the community. Our CSR initiatives focus on education, healthcare, and rural development.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {INITIATIVES.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-card border rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl">
                                {item.icon}
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 bg-primary/5 rounded-3xl p-12 text-center"
            >
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-6 fill-current" />
                <h3 className="text-3xl font-bold font-serif mb-6">Touching Lives</h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Beyond business, we are committed to making a tangible difference in the lives of people. Our goal is to empower rural communities and help them build a better future.
                </p>
            </motion.div>
        </AboutLayout>
    )
}
