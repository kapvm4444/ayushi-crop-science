import { useState } from "react"
import Layout from "@/layout/Layout"
import AuroraHero from "@/components/premium/AuroraHero"
import BentoGrid from "@/components/premium/BentoGrid"
import { Timeline } from "@/components/premium/Timeline"
import { motion } from "framer-motion"
import { Award, Users, Globe, Target, Leaf } from "lucide-react"

const VALUES_DATA = [
    {
        title: "Quality",
        description: "We never compromise on the quality of our products.",
        icon: <Award className="h-6 w-6 text-primary" />,
        className: "md:col-span-1"
    },
    {
        title: "Integrity",
        description: "We conduct our business with transparency and honesty.",
        icon: <Users className="h-6 w-6 text-primary" />,
        className: "md:col-span-1"
    },
    {
        title: "Sustainability",
        description: "We care for the environment and promote eco-friendly practices.",
        icon: <Leaf className="h-6 w-6 text-primary" />,
        className: "md:col-span-1"
    },
    {
        title: "Innovation",
        description: "We constantly innovate to meet the changing needs of farmers.",
        icon: <Globe className="h-6 w-6 text-primary" />,
        className: "md:col-span-3 bg-primary/5 border-primary/20"
    }
]

const LEADERS_DATA = [
    { name: "Dr. A.K. Sharma", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" },
    { name: "Priya Singh", role: "Head of Research", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" },
    { name: "Vikram Malhotra", role: "Operations Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" }
]

const CERTIFICATIONS_DATA = [
    { name: "ISO 9001:2015", icon: <Award className="h-16 w-16 text-primary" /> },
    { name: "Organic Certified", icon: <Leaf className="h-16 w-16 text-primary" /> },
    { name: "Global GAP", icon: <Globe className="h-16 w-16 text-primary" /> },
    { name: "Best Agrotech 2023", icon: <Award className="h-16 w-16 text-primary" /> }
]

export default function About() {
    const [values] = useState(VALUES_DATA)
    const [leaders] = useState(LEADERS_DATA)
    const [certifications] = useState(CERTIFICATIONS_DATA)

    const timelineData = [
        {
            title: "2010",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4 font-bold">
                        Inception
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Ayushi Crop Science was founded with a vision to serve farmers.
                    </p>
                </div>
            ),
        },
        {
            title: "2013",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4 font-bold">
                        Expansion
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Expanded operations to 5 states across India.
                    </p>
                </div>
            ),
        },
        {
            title: "2016",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4 font-bold">
                        R&D Center
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Established a state-of-the-art research facility.
                    </p>
                </div>
            ),
        },
        {
            title: "2019",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4 font-bold">
                        Global Reach
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Started exporting products to international markets.
                    </p>
                </div>
            ),
        },
        {
            title: "2023",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4 font-bold">
                        Sustainability Award
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Recognized for eco-friendly manufacturing practices.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <AuroraHero
                title="Our Roots, Our Legacy"
                subtitle="Ayushi Crop Science is dedicated to revolutionizing agriculture through innovation, quality, and a deep commitment to the farming community."
                ctaText="View Products"
                ctaLink="/products"
                secondaryCtaText="Contact Team"
                secondaryCtaLink="/contact"
                backgroundImage="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2070&auto=format&fit=crop"
            />

            <div className="container px-4 mx-auto py-24 space-y-24">

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border p-8 rounded-2xl shadow-lg"
                    >
                        <Target className="h-12 w-12 text-primary mb-6" />
                        <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            To provide high-quality, affordable, and eco-friendly crop protection solutions that enhance productivity and ensure food security for the nation.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border p-8 rounded-2xl shadow-lg"
                    >
                        <Globe className="h-12 w-12 text-primary mb-6" />
                        <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            To be a global leader in the agrochemical industry, known for our innovation, ethical practices, and contribution to sustainable agriculture.
                        </p>
                    </motion.div>
                </div>

                {/* Core Values */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-serif">Our Core Values</h2>
                    <BentoGrid items={values} />
                </motion.div>

                {/* Leadership Team */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-serif">Meet Our Leaders</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {leaders.map((member, i) => (
                            <div key={i} className="group text-center">
                                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary transition-colors">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-primary font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Timeline Section */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-serif">Our Journey</h2>
                    <Timeline data={timelineData} />
                </div>

                {/* Certifications Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-primary/5 rounded-3xl p-12 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 font-serif">Our Certifications & Awards</h2>
                    <div className="flex flex-wrap justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {certifications.map((cert, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                {cert.icon}
                                <span className="font-bold">{cert.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </Layout>
    )
}
