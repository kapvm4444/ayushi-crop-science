import { useState } from "react";
import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import { useSubmitDealer } from "@/hooks/useSubmitDealer.js";
import {
    useStates,
    useStateAreas,
    useDistricts,
    useTalukas,
    useVillages
} from "@/hooks/useLocations.js";
import { useProducts } from "@/hooks/useProducts.js";

export default function BecomeDealer() {
    const submitDealerMutation = useSubmitDealer();
    const [formData, setFormData] = useState({
        name: "",
        firmname: "",
        email: "",
        mobileno: "",
        pincode: "",
        pesticide_lic_no: "",
        state_id: "",
        statearea_id: "",
        district_id: "",
        taluka_id: "",
        village_id: "",
        product_id: "",
        interested_product: "",
        address: ""
    });

    // Fetch Location Data with Cascading Dependencies
    const { data: states } = useStates();
    const { data: stateAreas } = useStateAreas(formData.state_id);
    const { data: districts } = useDistricts(formData.statearea_id);
    const { data: talukas } = useTalukas(formData.district_id);
    const { data: villages } = useVillages(formData.taluka_id);
    const { data: products } = useProducts();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updates = { [name]: value };

            // Cascading Resets
            if (name === "state_id") {
                updates.statearea_id = "";
                updates.district_id = "";
                updates.taluka_id = "";
                updates.village_id = "";
            } else if (name === "statearea_id") {
                updates.district_id = "";
                updates.taluka_id = "";
                updates.village_id = "";
            } else if (name === "district_id") {
                updates.taluka_id = "";
                updates.village_id = "";
            } else if (name === "taluka_id") {
                updates.village_id = "";
            }

            return { ...prev, ...updates };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        submitDealerMutation.mutate(formData, {
            onSuccess: () => {
                setFormData({
                    name: "",
                    firmname: "",
                    email: "",
                    mobileno: "",
                    pincode: "",
                    pesticide_lic_no: "",
                    state_id: "",
                    statearea_id: "",
                    district_id: "",
                    taluka_id: "",
                    village_id: "",
                    product_id: "",
                    interested_product: "",
                    address: ""
                });
            }
        });
    };

    const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    return (
        <Layout>
            <AuroraHero
                title="Become a Dealer"
                compact={true}
                backgroundImage="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop"
            />

            <div className="container px-4 mx-auto py-24">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Benefits Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
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
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="bg-card border rounded-3xl p-8 shadow-lg"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-center">Dealer Application</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal & Business Info */}
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
                                    <Label htmlFor="firmname">Firm/Company Name</Label>
                                    <Input
                                        id="firmname"
                                        name="firmname"
                                        placeholder="Agro Traders"
                                        value={formData.firmname}
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
                                    <Label htmlFor="mobileno">Mobile Number</Label>
                                    <Input
                                        id="mobileno"
                                        name="mobileno"
                                        placeholder="+91 98765 43210"
                                        value={formData.mobileno}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="pesticide_lic_no">Pesticide Lic No</Label>
                                    <Input
                                        id="pesticide_lic_no"
                                        name="pesticide_lic_no"
                                        placeholder="License Number"
                                        value={formData.pesticide_lic_no}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pincode">Pincode</Label>
                                    <Input
                                        id="pincode"
                                        name="pincode"
                                        placeholder="360001"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Location Details Dropdowns */}
                            <div className="space-y-4">
                                <Label className="text-base font-semibold">Location Details</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="state_id" className="text-xs text-muted-foreground">State</Label>
                                        <select
                                            id="state_id"
                                            name="state_id"
                                            className={inputClass}
                                            value={formData.state_id}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select State</option>
                                            {states?.map(item => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="statearea_id" className="text-xs text-muted-foreground">State Area</Label>
                                        <select
                                            id="statearea_id"
                                            name="statearea_id"
                                            className={inputClass}
                                            value={formData.statearea_id}
                                            onChange={handleChange}
                                            required
                                            disabled={!formData.state_id}
                                        >
                                            <option value="">Select Area</option>
                                            {stateAreas?.map(item => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="district_id" className="text-xs text-muted-foreground">District</Label>
                                        <select
                                            id="district_id"
                                            name="district_id"
                                            className={inputClass}
                                            value={formData.district_id}
                                            onChange={handleChange}
                                            required
                                            disabled={!formData.statearea_id}
                                        >
                                            <option value="">Select District</option>
                                            {districts?.map(item => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="taluka_id" className="text-xs text-muted-foreground">Taluka</Label>
                                        <select
                                            id="taluka_id"
                                            name="taluka_id"
                                            className={inputClass}
                                            value={formData.taluka_id}
                                            onChange={handleChange}
                                            required
                                            disabled={!formData.district_id}
                                        >
                                            <option value="">Select Taluka</option>
                                            {talukas?.map(item => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="village_id" className="text-xs text-muted-foreground">Village</Label>
                                        <select
                                            id="village_id"
                                            name="village_id"
                                            className={inputClass}
                                            value={formData.village_id}
                                            onChange={handleChange}
                                            required
                                            disabled={!formData.taluka_id}
                                        >
                                            <option value="">Select Village</option>
                                            {villages?.map(item => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Full Address</Label>
                                <Textarea
                                    id="address"
                                    name="address"
                                    placeholder="Building, Street, Landmark..."
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="product_id">Interested Product</Label>
                                <select
                                    id="product_id"
                                    name="product_id"
                                    className={inputClass}
                                    value={formData.product_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Product from List</option>
                                    {products?.map(item => (
                                        <option key={item.id} value={item.id}>{item.name} {item.brand ? `(${item.brand})` : ''}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="interested_product">Message / Specific Requirements</Label>
                                <Textarea
                                    id="interested_product"
                                    name="interested_product"
                                    placeholder="Any specific requirements or additional details..."
                                    value={formData.interested_product}
                                    onChange={handleChange}
                                    rows={4}
                                    required
                                />
                            </div>

                            <Button type="submit" size="lg" disabled={submitDealerMutation.isPending} className="w-full">
                                {submitDealerMutation.isPending ? "Submitting..." : "Submit Application"}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
