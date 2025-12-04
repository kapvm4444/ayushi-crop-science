import Layout from "@/layout/Layout"
import AuroraHero from "@/components/premium/AuroraHero"
import { motion } from "framer-motion"
import { Calendar, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

const NEWS_ITEMS = [
    {
        id: "1",
        title: "Ayushi Crop Science Wins Sustainability Award",
        date: "March 15, 2024",
        author: "Admin",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
        excerpt: "We are proud to announce that we have been recognized for our eco-friendly manufacturing practices."
    },
    {
        id: "2",
        title: "New Herbicide 'WeedMaster' Launched",
        date: "February 28, 2024",
        author: "Product Team",
        image: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?q=80&w=2070&auto=format&fit=crop",
        excerpt: "Our latest herbicide offers superior control over broadleaf weeds in cotton crops."
    },
    {
        id: "3",
        title: "Expansion of R&D Facility",
        date: "December 10, 2023",
        author: "Management",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
        excerpt: "We have inaugurated our new state-of-the-art research wing to accelerate product innovation."
    }
]

export default function CompanyNews() {
    const [news] = useState(NEWS_ITEMS)

    return (
        <Layout>
            <AuroraHero
                title="Company News"
                subtitle="Latest announcements and updates from Ayushi Crop Science."
                backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="container px-4 mx-auto py-24">
                <div className="text-center mb-16">
                    <h2 className="section-title">Latest News</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {news.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px]"
                        >
                            <Link to={`/news/company-news/${item.id}`}>
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date}</span>
                                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {item.author}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm line-clamp-3">{item.excerpt}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
