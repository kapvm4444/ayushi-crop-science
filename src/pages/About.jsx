"use client";

import { useState } from "react";
// import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { Timeline } from "@/components/premium/Timeline";
import { motion } from "framer-motion";
import { Award, Globe, Leaf, ArrowRight, Factory, Users, Target, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  {
    title: "Who We Are",
    desc: "Our legacy, our roots, and our journey.",
    icon: <Users className="h-8 w-8 text-primary" />,
    href: "/about/who-we-are",
    image: "https://images.unsplash.com/photo-1595839088656-787c886c965e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Vision & Mission",
    desc: "The principles that guide every decision we make.",
    icon: <Target className="h-8 w-8 text-primary" />,
    href: "/about/vision-mission",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Our USP",
    desc: "What sets Ayushi Crop Science apart.",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    href: "/about/usp",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Infrastructure",
    desc: "World-class facilities for world-class products.",
    icon: <Factory className="h-8 w-8 text-primary" />,
    href: "/about/infrastructure",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Manufacturing & QA",
    desc: "Precision, purity, and performance in every batch.",
    icon: <Award className="h-8 w-8 text-primary" />,
    href: "/about/manufacturing",
    image: "https://images.unsplash.com/photo-1565514020176-dbf2277f026e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Environment",
    desc: "Committed to a greener, sustainable future.",
    icon: <Leaf className="h-8 w-8 text-primary" />,
    href: "/about/environment",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
  },
  {
    title: "CSR Activities",
    desc: "Giving back to the community that sustains us.",
    icon: <Heart className="h-8 w-8 text-primary" />,
    href: "/about/csr",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop"
  },
];

const CERTIFICATIONS_DATA = [
  { name: "ISO 9001:2015", icon: <Award className="h-16 w-16 text-primary" /> },
  {
    name: "Organic Certified",
    icon: <Leaf className="h-16 w-16 text-primary" />,
  },
  { name: "Global GAP", icon: <Globe className="h-16 w-16 text-primary" /> },
  {
    name: "Best Agrotech 2023",
    icon: <Award className="h-16 w-16 text-primary" />,
  },
];

export default function About() {
  const [certifications] = useState(CERTIFICATIONS_DATA);

  const timelineData = [
    {
      title: "2010",
      content: {
        title: "Inception",
        subtitle:
          "Ayushi Crop Science was founded with a vision to serve farmers.",
      },
    },
    {
      title: "2013",
      content: {
        title: "Expansion",
        subtitle: "Expanded operations to 5 states across India.",
      },
    },
    {
      title: "2016",
      content: {
        title: "R&D Center",
        subtitle: "Established a state-of-the-art research facility.",
      },
    },
    {
      title: "2019",
      content: {
        title: "Global Reach",
        subtitle: "Started exporting products to international markets.",
      },
    },
    {
      title: "2023",
      content: {
        title: "Sustainability Award",
        subtitle: "Recognized for eco-friendly manufacturing practices.",
      },
    },
  ];

  return (
    <>
      <AuroraHero
        title="Our Roots, Our Legacy"
        compact={true}
        backgroundImage="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="container px-4 mx-auto py-24 space-y-24">

        {/* Explore Grid */}
        {/* Explore Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full text-center mb-8">
            <h2 className="section-title">Explore Our World</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Discover the pillars that make Ayushi Crop Science a trusted name in agriculture.</p>
          </div>
          {SECTIONS.map((section, i) => (
            <Link key={i} href={section.href} className="group relative overflow-hidden rounded-3xl h-80 shadow-lg hover:shadow-2xl transition-all duration-500 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px]">
              <div className="absolute inset-0">
                <img src={section.image} alt={section.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-4 p-3 bg-white/10 backdrop-blur-md rounded-xl w-fit text-green-400">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                  <p className="text-white/80 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{section.desc}</p>
                  <div className="flex items-center gap-2 text-green-400 font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Read More <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Timeline Section */}
        <div>
          <h2 className="section-title">
            Our Journey
          </h2>
          <Timeline data={timelineData} />
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary/5 rounded-3xl p-12 text-center"
        >
          <h2 className="section-title">
            Our Certifications & Awards
          </h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {certifications.map((cert, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                {cert.icon}
                <span className="font-bold">{cert.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
