import { useState } from "react"
import Layout from "@/layout/Layout"
import AuroraHero from "@/components/premium/AuroraHero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { motion } from "framer-motion"

const FAQ_DATA = [
    { q: "Do you offer bulk purchasing?", a: "Yes, we offer special rates for bulk orders and dealerships. Please contact our sales team for more details." },
    { q: "Are your products organic?", a: "We have a dedicated range of certified organic products suitable for sustainable farming." },
    { q: "Do you provide technical support?", a: "Absolutely. Our team of agricultural experts is available to guide you on product usage and crop management." },
    { q: "Where can I find your products?", a: "Our products are available across major agricultural dealers in India. You can also order directly through us." }
]

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [faqs] = useState(FAQ_DATA)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        toast.success("Message sent successfully! We will get back to you soon.")
        setFormData({ name: "", email: "", subject: "", message: "" })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <Layout>
            <AuroraHero
                title="Get in Touch"
                subtitle="Have questions? We'd love to hear from you. Reach out to us for any inquiries about our products or services."
                ctaText="Call Us"
                ctaLink="tel:+919876543210"
                secondaryCtaText="Email Us"
                secondaryCtaLink="mailto:info@ayushicrop.com"
                backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            />

            <div className="container px-4 mx-auto py-24">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div className="text-center md:text-left">
                            <h2 className="section-title mb-6">Contact Information</h2>
                            <p className="text-muted-foreground text-lg">
                                We are here to help you with any questions or concerns. Feel free to reach out to us through any of the following channels.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <ContactItem
                                icon={<MapPin className="h-6 w-6 text-primary" />}
                                title="Our Location"
                                lines={["123 Agriculture Lane", "Green Valley, Gujarat, India"]}
                            />
                            <ContactItem
                                icon={<Phone className="h-6 w-6 text-primary" />}
                                title="Phone Number"
                                lines={["+91 98765 43210", "+91 12345 67890"]}
                            />
                            <ContactItem
                                icon={<Mail className="h-6 w-6 text-primary" />}
                                title="Email Address"
                                lines={["info@ayushicrop.com", "support@ayushicrop.com"]}
                            />
                            <ContactItem
                                icon={<Clock className="h-6 w-6 text-primary" />}
                                title="Working Hours"
                                lines={["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Closed"]}
                            />
                        </div>

                        {/* Map Placeholder */}
                        <div className="w-full h-80 bg-muted rounded-2xl overflow-hidden border shadow-inner relative group">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
                                <p className="text-muted-foreground font-medium flex items-center gap-2">
                                    <MapPin className="h-5 w-5" /> Google Map Embed
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border rounded-2xl p-8 shadow-xl sticky top-32"
                    >
                        <h2 className="section-title mb-6 text-center">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="bg-background/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="bg-background/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Product Inquiry"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="bg-background/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="How can we help you?"
                                    className="min-h-[150px] bg-background/50"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full text-lg h-12" size="lg">
                                Send Message
                            </Button>
                        </form>
                    </motion.div>

                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-24 max-w-3xl mx-auto"
                >
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-card border rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </Layout>
    )
}

function ContactItem({ icon, title, lines }) {
    return (
        <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="font-semibold mb-1">{title}</h3>
                {lines.map((line, i) => (
                    <p key={i} className="text-muted-foreground text-sm">{line}</p>
                ))}
            </div>
        </div>
    )
}
