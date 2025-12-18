"use client";

import AboutLayout from "./AboutLayout";
import {
  CheckCircle,
  FlaskConical,
  Truck,
  Award,
  Leaf,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";

const USPS = [
  {
    title: "State-of-the-art Manufacturing",
    desc: "Advanced facilities ensuring highest purity and potency standards.",
    icon: <FlaskConical className="h-8 w-8 text-primary" />,
  },
  {
    title: "In-house R&D Center",
    desc: "Recognized by Govt. of India for breakthrough innovations.",
    icon: <Award className="h-8 w-8 text-primary" />,
  },
  {
    title: "Pan-India Network",
    desc: "Reaching the remotest corners with our strong distribution chain.",
    icon: <Truck className="h-8 w-8 text-primary" />,
  },
  {
    title: "Certified Products",
    desc: "Wide range of ISO and Organic certified solutions.",
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
  },
  {
    title: "Sustainability",
    desc: "Eco-friendly formulations safe for soil and water.",
    icon: <Leaf className="h-8 w-8 text-primary" />,
  },
  {
    title: "Expert Support",
    desc: "24/7 technical guidance for farmers and dealers.",
    icon: <Headphones className="h-8 w-8 text-primary" />,
  },
];

export default function USP() {
  return (
    <AboutLayout
      title="Our USP"
      subtitle="What sets Ayushi Crop Science apart from the rest."
      image="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-xl leading-relaxed text-muted-foreground">
          In a crowded market, we stand out through our unwavering commitment to
          quality and innovation. Here is why farmers and dealers choose us:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {USPS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ willChange: "opacity, transform" }}
            className="group relative bg-card border hover:border-primary/50 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-shadow transition-colors duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 bg-white dark:bg-black/20 p-5 rounded-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>

            <h3 className="relative z-10 text-xl font-bold mb-3 group-hover:text-primary transition-colors">
              {item.title}
            </h3>

            <p className="relative z-10 text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 bg-primary text-primary-foreground rounded-3xl p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold font-space mb-6">
            More Than Just Products
          </h3>
          <p className="text-primary-foreground/90 text-lg leading-relaxed mb-8">
            We don&apos;t just sell products; we provide complete crop
            solutions. Our team of experts works closely with farmers to
            understand their specific needs and recommend the right products for
            their crops and soil conditions.
          </p>
        </div>
      </div>
    </AboutLayout>
  );
}
