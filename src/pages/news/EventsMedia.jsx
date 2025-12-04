import Layout from "@/layout/Layout"
import AuroraHero from "@/components/premium/AuroraHero"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

const EVENTS_ITEMS = [
    {
        id: "1",
        title: "Farmer Training Program in Punjab",
        date: "January 10, 2024",
        location: "Ludhiana, Punjab",
        image: "https://images.unsplash.com/photo-1595839088656-787c886c965e?q=80&w=2070&auto=format&fit=crop",
        excerpt: "Over 500 farmers participated in our workshop on sustainable farming techniques."
    },
    {
        id: "2",
        title: "Agri-Tech Expo 2023",
        date: "November 15, 2023",
        location: "New Delhi",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
        excerpt: "Showcasing our latest innovations at India's premier agriculture exhibition."
    },
    {
        id: "3",
        title: "Annual Distributors Meet",
        date: "October 05, 2023",
        location: "Mumbai",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
        excerpt: "Celebrating our partners' success and outlining the roadmap for the coming year."
    }
]

export default function EventsMedia() {
    const [events] = useState(EVENTS_ITEMS)

    return (
        <Layout>
            <AuroraHero
                title="Events & Media"
                subtitle="Highlights from our events, workshops, and media appearances."
                backgroundImage="https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="container px-4 mx-auto py-24">
                <div className="text-center mb-16">
                    <h2 className="section-title">Events Gallery</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {events.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px]"
                        >
                            <Link to={`/news/events-media/${item.id}`}>
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
                                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</span>
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
