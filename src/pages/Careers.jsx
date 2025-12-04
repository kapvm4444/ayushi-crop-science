import Layout from "@/layout/Layout"
import AuroraHero from "@/components/premium/AuroraHero"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MapPin, Clock } from "lucide-react"
import { Link } from "react-router-dom"

const JOBS = [
    {
        title: "Agricultural Scientist",
        location: "Gujarat, India",
        type: "Full-time",
        desc: "Lead research initiatives for new crop protection formulations."
    },
    {
        title: "Sales Manager",
        location: "Punjab, India",
        type: "Full-time",
        desc: "Manage dealer networks and drive sales growth in the region."
    },
    {
        title: "Quality Control Analyst",
        location: "Gujarat, India",
        type: "Full-time",
        desc: "Ensure all products meet our rigorous quality standards."
    }
]

export default function Careers() {
    return (
        <Layout>
            <AuroraHero
                title="Join Our Team"
                subtitle="Build a career with purpose. Help us revolutionize agriculture."
                backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
            />
            <div className="container px-4 mx-auto py-24">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Current Openings</h2>
                        <p className="text-muted-foreground">Explore opportunities to grow with us.</p>
                    </div>

                    {JOBS.map((job, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-card border rounded-2xl p-8 hover:shadow-lg transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                        >
                            <div>
                                <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                                <p className="text-muted-foreground mb-4">{job.desc}</p>
                                <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
                                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.type}</span>
                                </div>
                            </div>
                            <Link to={`/careers/apply/${i}`}>
                                <Button size="lg" className="rounded-full px-8">Apply Now</Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
