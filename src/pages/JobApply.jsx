import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Layout from "@/layout/Layout"
import AuroraHero from "@/components/premium/AuroraHero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"

export default function JobApply() {
    useParams() // Hook called but ID not used yet
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            toast.success("Application submitted successfully!", {
                description: "We will get back to you shortly."
            })
            navigate("/careers")
        }, 2000)
    }

    return (
        <Layout>
            <AuroraHero
                title="Apply for Position"
                subtitle="Take the next step in your career with Ayushi Crop Science."
                backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="container px-4 mx-auto py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto bg-card border rounded-2xl p-8 shadow-lg"
                >
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Application Form</h2>
                        <p className="text-muted-foreground">Please fill out the details below to apply.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" required placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" required placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" required placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" required placeholder="+91 98765 43210" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Input id="experience" type="number" min="0" required placeholder="e.g. 3" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="resume">Resume / CV</Label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX up to 10MB</p>
                                <Input id="resume" type="file" className="hidden" accept=".pdf,.doc,.docx" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coverLetter">Cover Letter</Label>
                            <Textarea id="coverLetter" placeholder="Tell us why you're a great fit..." className="min-h-[150px]" />
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </Layout>
    )
}
