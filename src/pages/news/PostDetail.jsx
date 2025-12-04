import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Layout from "@/layout/Layout"
import AuroraHero from "@/components/premium/AuroraHero"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Share2, MapPin } from "lucide-react"
import { motion } from "framer-motion"

// Mock Data - In a real app, this would come from an API or a central store
const MOCK_DATA = {
    "company-news": [
        {
            id: "1",
            title: "Ayushi Crop Science Wins Sustainability Award",
            date: "March 15, 2024",
            author: "Admin",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
            content: `
                <p>We are proud to announce that Ayushi Crop Science has been recognized for our eco-friendly manufacturing practices with the prestigious National Sustainability Award 2024.</p>
                <p>The award ceremony, held in New Delhi, highlighted our innovative "Zero Liquid Discharge" policy and our commitment to renewable energy.</p>
                <h3>A Commitment to the Future</h3>
                <p>Sustainability is not just a buzzword for us; it is a core value. Over the past five years, we have reduced our carbon footprint by 40% and implemented water recycling systems across all our manufacturing units.</p>
                <blockquote>"This award is a testament to the hard work of our entire team and our unwavering commitment to the environment." - Dr. A.K. Sharma, CEO</blockquote>
                <h3>What This Means for Farmers</h3>
                <p>Our sustainable practices ensure that the products we deliver are not only effective but also safe for the soil and the ecosystem. We believe that healthy soil is the foundation of a prosperous agricultural sector.</p>
            `
        },
        {
            id: "2",
            title: "New Herbicide 'WeedMaster' Launched",
            date: "February 28, 2024",
            author: "Product Team",
            image: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?q=80&w=2070&auto=format&fit=crop",
            content: "<p>Detailed content about the new herbicide launch...</p>"
        },
        {
            id: "3",
            title: "Expansion of R&D Facility",
            date: "December 10, 2023",
            author: "Management",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
            content: "<p>Details about the R&D facility expansion...</p>"
        }
    ],
    "events-media": [
        {
            id: "1",
            title: "Farmer Training Program in Punjab",
            date: "January 10, 2024",
            location: "Ludhiana, Punjab",
            image: "https://images.unsplash.com/photo-1595839088656-787c886c965e?q=80&w=2070&auto=format&fit=crop",
            content: "<p>Details about the training program...</p>"
        },
        {
            id: "2",
            title: "Agri-Tech Expo 2023",
            date: "November 15, 2023",
            location: "New Delhi",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
            content: "<p>Highlights from the expo...</p>"
        },
        {
            id: "3",
            title: "Annual Distributors Meet",
            date: "October 05, 2023",
            location: "Mumbai",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
            content: "<p>Summary of the distributors meet...</p>"
        }
    ],
    "blogs": [
        {
            id: "1",
            title: "Understanding Soil Health",
            date: "March 01, 2024",
            author: "Dr. A. Sharma",
            image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
            content: "<p>In-depth article about soil health...</p>"
        },
        {
            id: "2",
            title: "The Future of Organic Farming",
            date: "February 15, 2024",
            author: "R. Singh",
            image: "https://images.unsplash.com/photo-1615811361269-669f43e3e2a9?q=80&w=2070&auto=format&fit=crop",
            content: "<p>Article about organic farming trends...</p>"
        },
        {
            id: "3",
            title: "Pest Management in Monsoon",
            date: "January 20, 2024",
            author: "K. Patel",
            image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop",
            content: "<p>Tips for pest management...</p>"
        }
    ]
}

export default function PostDetail() {
    const { category, id } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate fetching data
        const categoryData = MOCK_DATA[category]
        const foundPost = categoryData?.find(item => item.id === id)

        if (foundPost) {
            setPost(foundPost)
        }
        setLoading(false)
    }, [category, id])

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </Layout>
        )
    }

    if (!post) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold">Post Not Found</h1>
                    <Link to="/news">
                        <Button>Back to News</Button>
                    </Link>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <AuroraHero
                title={category === 'blogs' ? 'Insights' : 'News & Updates'}
                subtitle="Stay informed about our latest achievements and industry insights."
                backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="container px-4 mx-auto py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <Link to={`/news/${category}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Back to {category.replace('-', ' ')}
                    </Link>

                    <div className="bg-card border rounded-3xl overflow-hidden shadow-xl">
                        <div className="aspect-video w-full relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <div className="flex items-center gap-4 text-sm font-medium mb-2 opacity-90">
                                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
                                    {post.author && <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>}
                                    {post.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {post.location}</span>}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold font-serif">{post.title}</h1>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                            <div className="border-t mt-12 pt-8 flex justify-between items-center">
                                <div className="text-muted-foreground font-medium">Share this article:</div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    )
}
