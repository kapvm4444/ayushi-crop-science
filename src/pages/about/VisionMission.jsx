import AboutLayout from "./AboutLayout";
import { Target, Globe, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useVisionMission } from "@/hooks/useVisionMission.js";

export default function VisionMission() {
  const { visionMission, isLoading, error } = useVisionMission();

  return (
    <AboutLayout
      title="Vision & Mission"
      subtitle="Guiding principles that drive our every action."
      image="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop"
    >
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="group bg-card border p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Globe className="h-32 w-32 text-primary" />
          </div>
          <div className="relative z-10">
            <div className="bg-primary/10 w-fit p-4 rounded-2xl mb-6">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-4 font-space">Our Vision</h3>
            {isLoading ? (
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
              </div>
            ) : (
              <p
                className="text-muted-foreground text-lg leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: visionMission.vision }}
              ></p>
            )}

            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
              Global Impact <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2 }}
          className="group bg-card border p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target className="h-32 w-32 text-primary" />
          </div>
          <div className="relative z-10">
            <div className="bg-primary/10 w-fit p-4 rounded-2xl mb-6">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-4 font-space">Our Mission</h3>
            {isLoading ? (
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
              </div>
            ) : (
              <p
                className="text-muted-foreground text-lg leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: visionMission.mission }}
              ></p>
            )}

            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
              Farmer Empowerment <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </AboutLayout>
  );
}
