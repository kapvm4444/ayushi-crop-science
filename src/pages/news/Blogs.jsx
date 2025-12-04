import Layout from "@/layout/Layout"
import AuroraHero from "@/components/premium/AuroraHero"
import { motion } from "framer-motion"
import { Calendar, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

const BLOG_ITEMS = [
    {
        id: "1",
        title: "Understanding Soil Health",
        date: "March 01, 2024",
        author: "Dr. A. Sharma",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
        excerpt: "A comprehensive guide to maintaining soil fertility for long-term agricultural productivity."
    },
    {
        id: "2",
        title: "The Future of Organic Farming",
        date: "February 15, 2024",
        author: "R. Singh",
        image: "https://images.unsplash.com/photo-1615811361269-669f43e3e2a9?q=80&w=2070&auto=format&fit=crop",
        excerpt: "Exploring the trends and technologies shaping the future of organic agriculture in India."
    },
    {
        id: "3",
        title: "Pest Management in Monsoon",
        date: "January 20, 2024",
        author: "K. Patel",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop",
        excerpt: "Effective strategies to protect your crops from common pests during the rainy season."
    }
]

export default function Blogs() {
    const [blogs] = useState(BLOG_ITEMS)

    return (
        <Layout>
            <AuroraHero
                title="Blogs & Insights"
                subtitle="Expert articles, farming tips, and industry insights."
                backgroundImage="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="container px-4 mx-auto py-24">
                <div className="text-center mb-16">
                    <h2 className="section-title">Recent Articles</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {blogs.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px]"
                        >
                            <Link to={`/news/blogs/${item.id}`}>
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
