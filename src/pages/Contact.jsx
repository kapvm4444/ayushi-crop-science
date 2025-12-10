import { useState } from "react";
import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";
import { useContact } from "@/hooks/useContact.js";
import { useSubmitContact } from "@/hooks/useSubmitContact.js";
import { Skeleton } from "@/components/ui/skeleton";
import ContactMap from "@/components/ContactMap";

const FAQ_DATA = [
  {
    q: "Do you offer bulk purchasing?",
    a: "Yes, we offer special rates for bulk orders and dealerships. Please contact our sales team for more details.",
  },
  {
    q: "Are your products organic?",
    a: "We have a dedicated range of certified organic products suitable for sustainable farming.",
  },
  {
    q: "Do you provide technical support?",
    a: "Absolutely. Our team of agricultural experts is available to guide you on product usage and crop management.",
  },
  {
    q: "Where can I find your products?",
    a: "Our products are available across major agricultural dealers in India. You can also order directly through us.",
  },
];

export default function Contact() {
  const { contactInfo, isLoading, error } = useContact();
  const submitContactMutation = useSubmitContact();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [faqs] = useState(FAQ_DATA);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitContactMutation.mutate(
      { ...formData },
      {
        onSuccess: () => {
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
      },
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <AuroraHero
        title="Get in Touch"
        compact={true}
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
      />

      <div className="container px-4 mx-auto py-12 md:py-24 space-y-24">
        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full h-[500px] rounded-3xl overflow-hidden shadow-xl border border-border/50"
        >
          {isLoading ? (
            <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
              Loading Map...
            </div>
          ) : (
            <ContactMap locations={contactInfo?.contactBranch || []} />
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Contact Info & Branches */}
          {isLoading ? (
            <div className="space-y-12">
              <div>
                <Skeleton className="h-10 w-48 mb-6" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-32 w-full rounded-2xl" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-8 w-40" />
                <div className="space-y-4">
                  <Skeleton className="h-40 w-full rounded-2xl" />
                  <Skeleton className="h-40 w-full rounded-2xl" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <div>
                <h2 className="section-title mb-6">Contact Information</h2>
                <p className="text-muted-foreground text-lg">
                  We are here to help you with any questions or concerns. Find our
                  branches below or send us a message.
                </p>
              </div>

              {/* General Contact */}
              {contactInfo && (
                <div className="grid gap-6">
                  <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                    <div className="bg-primary/10 p-3 rounded-full shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <p className="text-muted-foreground">{contactInfo.email}</p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4">
                    {contactInfo.facebook && (
                      <a
                        href={contactInfo.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="p-4 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all hover:scale-110"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {contactInfo.twitter && (
                      <a
                        href={contactInfo.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-4 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all hover:scale-110"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {contactInfo.instagram && (
                      <a
                        href={contactInfo.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="p-4 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all hover:scale-110"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {contactInfo.youtube && (
                      <a
                        href={contactInfo.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="p-4 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all hover:scale-110"
                      >
                        <Youtube className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Branches List */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Our Branches</h3>
                <div className="grid sm:grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {contactInfo?.contactBranch?.map((branch) => (
                    <div
                      key={branch.id}
                      className="bg-card p-6 rounded-2xl border hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1 p-2 bg-secondary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">
                            {branch.branchname}
                          </h4>
                          <p className="text-muted-foreground text-sm mb-3 leading-relaxed whitespace-pre-line">
                            {branch.address}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{branch.contactno}</span>
                            </div>
                            {branch.contactno2 && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                <span>{branch.contactno2}</span>
                              </div>
                            )}
                          </div>

                          {branch.lat && branch.long && (
                            <a
                              href={`https://maps.google.com/?q=${branch.lat},${branch.long}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline mt-4"
                            >
                              Get Directions &rarr;
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-card border rounded-3xl p-8 md:p-12 shadow-xl sticky top-24"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
              <p className="text-muted-foreground">
                We'd love to hear from you.
              </p>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-10 w-full" /></div>
                  <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                </div>
                <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-32 w-full" /></div>
                <Skeleton className="h-12 w-full rounded-full" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
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
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
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
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Product Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    className="min-h-[150px] resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitContactMutation.isPending}
                  className="w-full text-lg h-12 rounded-full"
                  size="lg"
                >
                  {submitContactMutation.isPending
                    ? "Sending..."
                    : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto pt-12 border-t"
        >
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="grid gap-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-card border rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg mb-3 flex items-start gap-3">
                  <span className="text-primary text-xl">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-muted-foreground pl-8 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
