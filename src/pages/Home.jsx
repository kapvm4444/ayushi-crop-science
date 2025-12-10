import { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  Sprout,
  Leaf,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Layout from "@/layout/Layout";
import ModernHero from "@/components/premium/ModernHero";
import BentoGrid from "@/components/premium/BentoGrid";
import CountUp from "@/components/premium/CountUp";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LightRays from "@/components/premium/LightRays";
import { useTestimonials } from "@/hooks/useTestimonials.js";
import { useNews } from "@/hooks/useNews.js";
import { useProducts } from "@/hooks/useProducts.js";
import { useStaticPages } from "@/hooks/useStaticPages.js";
import { useWhoWeAre } from "@/hooks/useWhoWeAre.js";

const FEATURES_DATA = [
  {
    title: "Quality Assurance",
    description:
      "Every product undergoes rigorous testing to ensure maximum efficacy and safety for your crops.",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Sustainable Growth",
    description:
      "Our formulations are designed to boost yield while maintaining soil health and environmental balance.",
    icon: <Sprout className="h-6 w-6 text-primary" />,
    className: "md:col-span-2 bg-primary/5 border-primary/20",
  },
  {
    title: "Expert Support",
    description:
      "Our team of agricultural experts is always ready to guide you with the best farming practices.",
    icon: <Leaf className="h-6 w-6 text-primary" />,
    className: "md:col-span-3",
  },
];

const STATS_DATA = [
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Products", value: 50, suffix: "+" },
  { label: "Happy Farmers", value: 10, suffix: "k+" },
  { label: "Acres Covered", value: 1, suffix: "M+" },
];

const TESTIMONIALS_DATA = [
  {
    name: "Rajesh Kumar",
    role: "Cotton Farmer",
    quote:
      "Ayushi Crop Science products have completely transformed my yield. The quality is unmatched.",
  },
  {
    name: "Suresh Patel",
    role: "Wheat Farmer",
    quote:
      "I've been using their fertilizers for 3 years. My soil health has improved significantly.",
  },
  {
    name: "Anita Devi",
    role: "Organic Farmer",
    quote:
      "Their organic range is fantastic. It's effective and safe for the environment.",
  },
  {
    name: "Vikram Singh",
    role: "Paddy Farmer",
    quote: "Best pest control solutions in the market. Highly recommended!",
  },
  {
    name: "Meena Kumari",
    role: "Vegetable Grower",
    quote:
      "My production has increased by 40% since I started using their growth boosters.",
  },
];

const PROCESS_DATA = [
  {
    step: "01",
    title: "Research",
    desc: "Understanding crop needs through deep scientific research.",
  },
  {
    step: "02",
    title: "Develop",
    desc: "Formulating potent and safe solutions in our labs.",
  },
  {
    step: "03",
    title: "Test",
    desc: "Rigorous field testing to ensure maximum efficacy.",
  },
  {
    step: "04",
    title: "Deliver",
    desc: "Reaching farmers with high-quality products.",
  },
];

const NEWS_DATA = [
  {
    title: "Launch of 'Super Yield' Growth Booster",
    date: "Dec 01, 2023",
    image:
      "https://images.unsplash.com/photo-1595839088656-787c886c965e?q=80&w=2070&auto=format&fit=crop",
    desc: "Introducing our revolutionary plant growth regulator that increases yield by up to 25%.",
  },
  {
    title: "Ayushi Crop Science at Kisan Mela 2023",
    date: "Nov 15, 2023",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2074&auto=format&fit=crop",
    desc: "We showcased our latest innovations to over 2000 farmers at the annual Kisan Mela.",
  },
  {
    title: "Expansion into South Indian Markets",
    date: "Oct 20, 2023",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop",
    desc: "Extending our dealership network to serve farmers in Karnataka and Tamil Nadu.",
  },
];

const ABOUT_POINTS_DATA = [
  "Innovative Research & Development",
  "Wide Range of Crop Solutions",
  "Nationwide Distribution Network",
  "Farmer-Centric Approach",
];

export default function Home() {
  const [features] = useState(FEATURES_DATA);
  const { products: fetchedProducts } = useProducts();
  const [stats, setStats] = useState(STATS_DATA);

  const { testimonials: fetchedTestimonials } = useTestimonials();
  const { news: fetchedNews } = useNews();
  const [process] = useState(PROCESS_DATA);
  const [aboutPoints, setAboutPoints] = useState(ABOUT_POINTS_DATA);
  const scrollContainerRef = useRef(null);

  const testimonials =
    fetchedTestimonials && fetchedTestimonials.length > 0
      ? fetchedTestimonials
      : TESTIMONIALS_DATA;
  const news = fetchedNews && fetchedNews.length > 0 ? fetchedNews : NEWS_DATA;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width
      const newScrollLeft =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <Layout>
      {/* Premium Hero Section */}
      <div className="relative w-full h-full">
        <ModernHero />
        <div className="absolute inset-0 pointer-events-none z-10 mix-blend-screen opacity-60">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.5}
            lightSpread={1.5}
            rayLength={2}
            pulsating={true}
            fadeDistance={2.0}
            saturation={1.5}
            followMouse={true}
            mouseInfluence={0.6}
            noiseAmount={0.05}
            distortion={0}
          />
        </div>
      </div>

      {/* Features Section with Bento Grid */}
      <section className="py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Why Choose Ayushi Crop Science?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine traditional farming wisdom with modern scientific
              advancements to provide the best care for your crops.
            </p>
          </motion.div>

          <BentoGrid items={features} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#15803d] text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-4 min-w-[120px]">
                <div className="text-4xl md:text-6xl font-bold text-white drop-shadow-md">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-primary-foreground/90 font-medium text-lg uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container px-4 mx-auto mb-12 text-center"
        >
          <h2 className="section-title">Stories from the Field</h2>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-8 px-4 container mx-auto scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="flex-shrink-0 w-[350px] bg-card border p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer whitespace-normal flex flex-col min-h-[280px]"
            >
              <p className="text-muted-foreground mb-6 italic text-lg leading-relaxed flex-grow">
                &quot;
                {testimonial.content || testimonial.text || testimonial.quote}
                &quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0 overflow-hidden">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      onError={(e) =>
                        (e.target.src =
                          "https://placehold.co/100x100?text=User")
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    testimonial.name[0]
                  )}
                </div>
                <div>
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-primary">
                    {testimonial.role || "Farmer"}
                  </div>
                </div>
                <div className="ml-auto flex gap-0.5"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-title"
            >
              How We Work
            </motion.h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {process.map((process, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow group w-full md:w-[calc(25%-2rem)] min-w-[250px]"
              >
                <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4 group-hover:text-primary/20 transition-colors">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">
                  {process.title}
                </h3>
                <p className="text-muted-foreground relative z-10">
                  {process.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-title"
            >
              Latest Updates
            </motion.h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {news.slice(0, 3).map((news, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer w-full md:w-[calc(33.33%-2rem)] min-w-[300px]"
              >
                <div className="rounded-2xl overflow-hidden mb-4 aspect-video">
                  <img
                    src={news.image}
                    alt={news.title}
                    onError={(e) =>
                      (e.target.src = "https://placehold.co/600x400?text=News")
                    }
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="text-sm text-primary font-medium mb-2">
                  {news.date}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3">
                  {news.desc || news.short_description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container px-4 mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070&auto=format&fit=crop"
                alt="Futuristic Agriculture"
                onError={(e) =>
                  (e.target.src = "https://placehold.co/800x600?text=About+Us")
                }
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-6"
          >
            <h2 className="section-title mb-6">
              Committed to Farmer&apos;s Prosperity
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ayushi Crop Science has been a trusted partner in agriculture for
              over a decade. We specialize in manufacturing high-quality
              insecticides, herbicides, fungicides, and plant growth regulators.
            </p>
            <ul className="space-y-3">
              {aboutPoints.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="mt-4">
              Learn More About Us
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
