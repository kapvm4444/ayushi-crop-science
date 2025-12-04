import { useState, useEffect } from "react";
import { FlipWords } from "./FlipWords";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModernHero() {
    const words = ["Sustainable", "Innovative", "Eco-friendly", "Advanced"];

    // Amazing background images carousel
    const backgroundImages = [
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop", // Modern farm with tech
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070&auto=format&fit=crop", // Futuristic agriculture
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop", // Green fields aerial
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop", // Sunset farm landscape
        "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop", // Modern greenhouse
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % backgroundImages.length
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [backgroundImages.length]);

    return (
        <div className="h-screen relative w-full overflow-hidden flex flex-col items-center justify-center bg-black">
            {/* Animated Background Carousel */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 2.0, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
                        }}
                    />
                    {/* Gradient Overlays for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Animated Particles/Grid Overlay */}
            <div className="absolute inset-0 bg-grid-white opacity-5" />

            {/* Animated Aurora Effect */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 50% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
                    ],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Content */}
            <motion.div
                layout
                className="relative z-10 text-3xl md:text-6xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white flex flex-wrap justify-center gap-2 items-center px-4"
            >
                <motion.span layout>Cultivating an</motion.span>
                <FlipWords words={words} className="text-green-500 font-bold" />
                <motion.span layout>Future</motion.span>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-10 text-neutral-200 text-sm md:text-lg max-w-xl mt-6 text-center px-4"
            >
                Empowering farmers with cutting-edge crop protection and nutrition
                solutions for better yields and a healthier planet.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-4 mt-8 relative z-10"
            >
                <Button
                    size="lg"
                    className="rounded-full bg-green-600 hover:bg-green-700 text-white border-0 h-12 px-8 text-lg shadow-lg shadow-green-600/50 hover:shadow-xl hover:shadow-green-600/60 transition-all"
                    asChild
                >
                    <a href="/products">
                        Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:text-white h-12 px-8 text-lg"
                    asChild
                >
                    <a href="/contact">Contact Us</a>
                </Button>
            </motion.div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {backgroundImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                            ? "w-8 bg-green-500"
                            : "w-2 bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                    <motion.div
                        className="w-1.5 h-1.5 bg-white rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
