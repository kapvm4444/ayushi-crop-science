import { useParams, Link } from "react-router-dom"
import Layout from "@/layout/Layout"
import AuroraHero from "@/components/premium/AuroraHero"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import { motion } from "framer-motion"

export default function NewsDetails() {
    useParams()

    // Dummy data - in a real app, fetch based on ID
    const article = {
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
    }

    return (
        <Layout>
            <AuroraHero
                title="News & Updates"
                subtitle="Stay informed about our latest achievements and industry insights."
                backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="container px-4 mx-auto py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <Link to="/news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Back to News
                    </Link>

                    <div className="bg-card border rounded-3xl overflow-hidden shadow-xl">
                        <div className="aspect-video w-full relative">
                            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <div className="flex items-center gap-4 text-sm font-medium mb-2 opacity-90">
                                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {article.date}</span>
                                    <span className="flex items-center gap-1"><User className="h-4 w-4" /> {article.author}</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold font-serif">{article.title}</h1>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

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
