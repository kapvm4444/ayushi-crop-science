"use client";

// import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useCareer } from "@/hooks/useCareer.js";
import { Skeleton } from "@/components/ui/skeleton";

export default function Careers() {
  const { career: jobs, isLoading, error } = useCareer();

  return (
    <>
      <AuroraHero
        title="Join Our Team"
        compact={true}
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
      />
      <div className="container px-4 mx-auto py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Current Openings</h2>
            <p className="text-muted-foreground">
              Explore opportunities to grow with us.
            </p>
          </div>

          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="w-full space-y-4">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-12 w-32 rounded-full" />
              </div>
            ))
            : jobs?.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ willChange: "opacity, transform" }}
                className="bg-card border rounded-2xl p-8 hover:shadow-lg transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                  <div
                    className="text-muted-foreground mb-4 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {job.type}
                    </span>
                  </div>
                </div>
                <Link href={`/careers/apply/${job.slug}`}>
                  <Button size="lg" className="rounded-full px-8 shrink-0">
                    Apply Now
                  </Button>
                </Link>
              </motion.div>
            ))}
        </div>
      </div>
    </>
  );
}
