import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BentoGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          viewport={{ once: true }}
          style={{ willChange: "opacity, transform" }}
          className={cn(
            "group relative overflow-hidden rounded-xl border bg-background/50 p-6 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm",
            item.className,
          )}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            {item.icon}
          </div>
          <h3 className="mb-2 text-xl font-bold text-foreground">
            {item.title}
          </h3>
          <p className="text-muted-foreground">{item.description}</p>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}
