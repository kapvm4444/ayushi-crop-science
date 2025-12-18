"use client";

import AboutLayout from "./AboutLayout";
import { motion } from "framer-motion";
import { Sprout, Users } from "lucide-react";
import { useWhoWeAre } from "@/hooks/useWhoWeAre.js";

export default function WhoWeAre() {
  const { about, isLoading, error } = useWhoWeAre();

  return (
    <AboutLayout
      title="Who We Are"
      subtitle="A legacy of trust, innovation, and commitment to Indian agriculture."
      image="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
    >
      <div className="flex flex-col gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] w-full group">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
              alt="Field"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full relative"
        >
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
            <img
              src="/placeholder.png"
              alt=""
              className="w-[80%] object-contain grayscale"
            />
          </div>

          {isLoading ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />

              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="relative z-10">
              <p
                className="text-lg leading-relaxed mb-6 text-justify"
                dangerouslySetInnerHTML={{ __html: about.description }}
              ></p>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-secondary/20 rounded-3xl p-12"
      >
        <div className="text-center">
          <h3 className="text-3xl font-bold section-title mb-8">
            Our Core Philosophy
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-xl shadow-sm border flex gap-4">
            <div className="bg-primary/10 p-3 rounded-lg h-fit">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Farmer First</h4>
              <p className="text-muted-foreground">
                Every decision we make is guided by the best interests of the
                farming community.
              </p>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl shadow-sm border flex gap-4">
            <div className="bg-primary/10 p-3 rounded-lg h-fit">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Sustainable Growth</h4>
              <p className="text-muted-foreground">
                We believe that when farmers prosper, the nation prospers.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AboutLayout>
  );
}
