"use client";

import { useState } from "react";
// import Layout from "@/layout/Layout";
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
  useVillages,
} from "@/hooks/useLocations.js";
import { useProducts } from "@/hooks/useProducts.js";
import { useContact } from "@/hooks/useContact.js";
import { Combobox } from "@/components/ui/combobox.jsx";
import { Skeleton } from "@/components/ui/skeleton";

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
    address: "",
  });

  // Fetch Location Data with Cascading Dependencies
  const { contactInfo } = useContact();
  const { data: states, isLoading: isLocLoading } = useStates();
  const { data: stateAreas } = useStateAreas(formData.state_id);
  const { data: districts } = useDistricts(formData.statearea_id);
  const { data: talukas } = useTalukas(formData.district_id);
  const { data: villages } = useVillages(formData.taluka_id);
  const { data: products, isLoading: isProdLoading } = useProducts();

  const isLoading = isLocLoading || isProdLoading;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
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
          address: "",
        });
      },
    });
  };

  // Helper to format options for Combobox
  const mapOptions = (data) =>
    data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const productOptions =
    products?.map((item) => ({
      value: item.id,
      label: `${item.name}${item.brand ? ` (${item.brand})` : ""}`,
    })) || [];

  return (
    <>
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
              Ayushi Crop Science offers a lucrative partnership opportunity for
              individuals and businesses looking to grow in the agricultural
              sector.
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
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        contactInfo?.quick_contacts
                          .map(
                            (contact) =>
                              `<a href="tel:${contact?.contactno}">${contact?.contactno}</a>`,
                          )
                          .join("<br>") || "...",
                    }}
                  ></span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href={`mailto:${contactInfo?.email}`}>
                    {contactInfo?.email || "..."}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{contactInfo?.default_address || "..."}</span>
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
            <h2 className="text-2xl font-bold mb-6 text-center">
              Dealer Application
            </h2>
            {isLoading ? (
              <div className="space-y-6">
                {/* Matching the form structure with skeletons */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="space-y-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-24 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-32 w-full" />
                </div>
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            ) : (
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
                  <Label className="text-base font-semibold">
                    Location Details
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="state_id"
                        className="text-xs text-muted-foreground"
                      >
                        State
                      </Label>
                      <Combobox
                        options={mapOptions(states)}
                        value={formData.state_id}
                        onChange={(val) => handleSelectChange("state_id", val)}
                        placeholder="Select State"
                        searchPlaceholder="Search state..."
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="statearea_id"
                        className="text-xs text-muted-foreground"
                      >
                        State Area
                      </Label>
                      <Combobox
                        options={mapOptions(stateAreas)}
                        value={formData.statearea_id}
                        onChange={(val) =>
                          handleSelectChange("statearea_id", val)
                        }
                        placeholder="Select Area"
                        searchPlaceholder="Search area..."
                        disabled={!formData.state_id}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="district_id"
                        className="text-xs text-muted-foreground"
                      >
                        District
                      </Label>
                      <Combobox
                        options={mapOptions(districts)}
                        value={formData.district_id}
                        onChange={(val) =>
                          handleSelectChange("district_id", val)
                        }
                        placeholder="Select District"
                        searchPlaceholder="Search district..."
                        disabled={!formData.statearea_id}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="taluka_id"
                        className="text-xs text-muted-foreground"
                      >
                        Taluka
                      </Label>
                      <Combobox
                        options={mapOptions(talukas)}
                        value={formData.taluka_id}
                        onChange={(val) => handleSelectChange("taluka_id", val)}
                        placeholder="Select Taluka"
                        searchPlaceholder="Search taluka..."
                        disabled={!formData.district_id}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="village_id"
                        className="text-xs text-muted-foreground"
                      >
                        Village
                      </Label>
                      <Combobox
                        options={mapOptions(villages)}
                        value={formData.village_id}
                        onChange={(val) =>
                          handleSelectChange("village_id", val)
                        }
                        placeholder="Select Village"
                        searchPlaceholder="Search village..."
                        disabled={!formData.taluka_id}
                      />
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
                  <Combobox
                    options={productOptions}
                    value={formData.product_id}
                    onChange={(val) => handleSelectChange("product_id", val)}
                    placeholder="Select specific product..."
                    searchPlaceholder="Search product..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interested_product">
                    Message / Specific Requirements
                  </Label>
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

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitDealerMutation.isPending}
                  className="w-full"
                >
                  {submitDealerMutation.isPending
                    ? "Submitting..."
                    : "Submit Application"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
