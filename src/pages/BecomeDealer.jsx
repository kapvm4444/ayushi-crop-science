import { useState } from "react";
import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react";

export default function BecomeDealer() {
    const [formData, setFormData] = useState({
        name: "",
        companyName: "",
        email: "",
        phone: "",
        address: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dealer Application Submitted:", formData);
        // Add API call logic here
        alert("Thank you for your interest! We will contact you soon.");
    };

    return (
        <Layout>
            <AuroraHero
                title="Become a Dealer"
                subtitle="Join our network of successful partners and help us revolutionize agriculture across the nation."
                ctaText="Apply Now"
                ctaLink="#apply-form"
                backgroundImage="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop"
            />

            <div className="container px-4 mx-auto py-24">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Benefits Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center md:text-left"
                    >
                        <h2 className="section-title mb-8">Why Partner With Us?</h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            Ayushi Crop Science offers a lucrative partnership opportunity for individuals and businesses looking to grow in the agricultural sector.
                        </p>

                        <ul className="space-y-6 mb-12">
                            {[
                                "High-quality, research-backed products",
                                "Attractive margins and incentives",
                                "Marketing and promotional support",
                                "Technical training and guidance",
                                "Exclusive territory rights",
                            ].map((benefit, i) => (
                                <li key={i} className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <CheckCircle className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium text-lg">{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="bg-secondary/20 p-8 rounded-2xl border border-border">
                            <h3 className="text-xl font-bold mb-4">Contact Support</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Phone className="h-5 w-5 text-primary" />
                                    <span>+91 98765 43210</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <span>partners@ayushicrop.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    <span>123 Agriculture Lane, Green Valley, India</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Application Form */}
                    <motion.div
                        id="apply-form"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-card border rounded-3xl p-8 shadow-lg"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-center">Dealer Application</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company Name</Label>
                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        placeholder="Agro Traders"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Business Address</Label>
                                <Textarea
                                    id="address"
                                    name="address"
                                    placeholder="Full address with pincode"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Why do you want to partner with us?</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us about your experience and business plan..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                />
                            </div>

                            <Button type="submit" size="lg" className="w-full">
                                Submit Application
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
