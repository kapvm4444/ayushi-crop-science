import AboutLayout from "./AboutLayout";
import { motion } from "framer-motion";
import { Leaf, Droplets, Sun, Recycle, Sprout } from "lucide-react";

const INITIATIVES = [
  {
    title: "Zero Liquid Discharge",
    desc: "Advanced ETP and RO systems ensure 100% water recycling and reuse.",
    icon: <Droplets className="h-8 w-8 text-green-600" />,
  },
  {
    title: "Solar Power",
    desc: "Harnessing renewable energy to power 40% of our manufacturing operations.",
    icon: <Sun className="h-8 w-8 text-yellow-500" />,
  },
  {
    title: "Green Chemistry",
    desc: "Developing bio-based formulations to reduce chemical load on soil.",
    icon: <Sprout className="h-8 w-8 text-green-500" />,
  },
  {
    title: "Waste Management",
    desc: "Strict adherence to hazardous waste disposal regulations.",
    icon: <Recycle className="h-8 w-8 text-blue-500" />,
  },
];

export default function Environment() {
  return (
    <AboutLayout
      title="Environment"
      subtitle="Committed to a greener, sustainable future."
      image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
    >
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-xl leading-relaxed text-muted-foreground">
          We understand the delicate balance of nature and our responsibility
          towards it. As an agrochemical company, we are deeply committed to
          minimizing our environmental footprint and promoting sustainable
          farming practices.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mb-16 justify-items-center">
        {INITIATIVES.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ willChange: "opacity, transform" }}
            className="bg-card border p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex gap-6 items-start w-full"
          >
            <div className="bg-secondary/30 p-4 rounded-2xl">{item.icon}</div>
            <div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ willChange: "opacity, transform" }}
        className="bg-green-900/10 rounded-3xl p-12 text-center border border-green-500/20"
      >
        <Leaf className="h-12 w-12 text-green-600 mx-auto mb-6" />
        <h3 className="text-3xl font-bold font-serif mb-6 text-green-800 dark:text-green-400">
          Integrated Pest Management
        </h3>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We actively educate farmers on Integrated Pest Management (IPM) to
          encourage judicious use of pesticides. Our goal is to protect crops
          while preserving beneficial insects and soil health.
        </p>
      </motion.div>
    </AboutLayout>
  );
}
