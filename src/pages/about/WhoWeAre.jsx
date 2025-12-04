import AboutLayout from "./AboutLayout"
import { motion } from "framer-motion"
import { Sprout, Users } from "lucide-react"

export default function WhoWeAre() {
    return (
        <AboutLayout
            title="Who We Are"
            subtitle="A legacy of trust, innovation, and commitment to Indian agriculture."
            image="https://images.unsplash.com/photo-1595839088656-787c886c965e?q=80&w=2070&auto=format&fit=crop"
        >
            <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1"
                >
                    <p className="text-lg leading-relaxed mb-6">
                        Ayushi Crop Science is a leading name in the agrochemical industry, dedicated to providing innovative and effective crop protection solutions to farmers across India. Established with a vision to revolutionize agriculture, we have grown from a small startup to a trusted partner for millions of farmers.
                    </p>
                    <p className="text-lg leading-relaxed mb-6">
                        Our journey began over a decade ago, driven by a passion for agriculture and a deep understanding of the challenges faced by farmers. We recognized the need for high-quality, affordable, and sustainable inputs that could help farmers increase their yields and improve their livelihoods.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 relative"
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
                            alt="Field"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-secondary/20 rounded-3xl p-12"
            >
                <h3 className="text-3xl font-bold font-serif mb-8 text-center">Our Core Philosophy</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-card p-6 rounded-xl shadow-sm border flex gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg h-fit">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-2">Farmer First</h4>
                            <p className="text-muted-foreground">Every decision we make is guided by the best interests of the farming community.</p>
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-xl shadow-sm border flex gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg h-fit">
                            <Sprout className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-2">Sustainable Growth</h4>
                            <p className="text-muted-foreground">We believe that when farmers prosper, the nation prospers.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AboutLayout>
    )
}
