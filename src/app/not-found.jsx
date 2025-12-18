"use client";
import Link from "next/link";
// import Layout from "@/layout/Layout";
import { Button } from "@/components/ui/button";
import AuroraHero from "@/components/premium/AuroraHero";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <>
            <AuroraHero
                title="404"
                subtitle="Page Not Found"
                compact={true}
                backgroundImage="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="container px-4 mx-auto py-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto space-y-8"
                >
                    <div className="relative w-48 h-48 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-8">
                        <span className="text-8xl font-bold text-primary/40">?</span>
                    </div>

                    <h2 className="text-3xl font-bold">Oops! Lost in the Fields?</h2>
                    <p className="text-muted-foreground text-lg">
                        The page you are looking for might have been moved, deleted, or possibly never existed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="rounded-full">
                            <Link href="/">
                                <Home className="mr-2 h-5 w-5" /> Go Home
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full">
                            <Link href="/products">
                                <Search className="mr-2 h-5 w-5" /> Browse Products
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
