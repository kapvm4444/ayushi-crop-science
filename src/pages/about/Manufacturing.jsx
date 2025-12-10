import AboutLayout from "./AboutLayout"
import { motion } from "framer-motion"
import { ClipboardCheck, Microscope, PackageCheck, Settings, Zap } from "lucide-react"

const QA_STEPS = [
    {
        title: "Raw Material Testing",
        desc: "Every ingredient is tested for purity before entering the production line.",
        icon: <Microscope className="h-6 w-6 text-primary" />
    },
    {
        title: "In-Process Checks",
        desc: "Continuous monitoring during formulation to ensure consistency.",
        icon: <Settings className="h-6 w-6 text-primary" />
    },
    {
        title: "Final Analysis",
        desc: "Finished products undergo rigorous testing in our NABL accredited labs.",
        icon: <ClipboardCheck className="h-6 w-6 text-primary" />
    },
    {
        title: "Packaging Integrity",
        desc: "Ensuring leak-proof and tamper-evident packaging for safety.",
        icon: <PackageCheck className="h-6 w-6 text-primary" />
    }
]

export default function Manufacturing() {
    return (
        <AboutLayout
            title="Manufacturing & QA"
            subtitle="Precision, Purity, and Performance."
            image="https://images.unsplash.com/photo-1565514020176-dbf2277f026e?q=80&w=2070&auto=format&fit=crop"
        >
            <div className="max-w-3xl mx-auto text-center mb-16">
                <p className="text-xl leading-relaxed text-muted-foreground">
                    At Ayushi Crop Science, quality is not just a buzzword; it is a promise. Our manufacturing processes are governed by strict quality assurance protocols to ensure that every batch leaving our factory meets the highest standards of efficacy and safety.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square"
                >
                    <img
                        src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070&auto=format&fit=crop"
                        alt="Lab Testing"
                        onError={(e) => (e.target.src = "https://placehold.co/800x800?text=Lab+Testing")}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                        <div className="text-white">
                            <h3 className="text-2xl font-bold mb-2">Advanced Labs</h3>
                            <p className="opacity-90">Equipped with HPLC, GC, and UV-Vis spectrophotometers.</p>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-8">
                    <div className="mb-8">
                        <h3 className="text-3xl font-bold font-serif mb-4">Quality Assurance Process</h3>
                        <p className="text-muted-foreground">Our 4-step quality control ensures zero defects.</p>
                    </div>
                    <div className="grid gap-6">
                        {QA_STEPS.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4 bg-secondary/20 p-4 rounded-xl"
                            >
                                <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                    {step.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">{step.title}</h4>
                                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary/5 rounded-3xl p-12 text-center"
            >
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
                    <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold font-serif mb-6">Production Capabilities</h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Our versatile production lines can handle various types of formulations, allowing us to offer a diverse product portfolio including EC, SC, SL, WP, WDG, and Granules. We continuously upgrade our technology to improve efficiency and reduce environmental impact.
                </p>
            </motion.div>
        </AboutLayout>
    )
}
