"use client";

import AuroraHero from "@/components/premium/AuroraHero";
import { useFaqs } from "@/hooks/useFaqs";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Faqs() {
    const { faqs: faqsData, isLoading: isFaqsLoading } = useFaqs();

    return (
        <>
            <AuroraHero
                title="Frequently Asked Questions"
                subtitle="Find answers to common questions about our products and services."
                compact={true}
                backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            />

            <div className="container px-4 mx-auto py-12 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto"
                >
                    {isFaqsLoading ? (
                        <div className="grid gap-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-8 w-3/4" />
                                    <Skeleton className="h-20 w-full rounded-2xl" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {faqsData && faqsData.length > 0 ? (
                                faqsData.map((faq, i) => (
                                    <div
                                        key={i}
                                        className="bg-card border rounded-2xl p-6 hover:shadow-md transition-shadow"
                                    >
                                        <h3 className="font-bold text-lg mb-3 flex items-start gap-3">
                                            <span className="text-primary text-xl">Q.</span>
                                            {faq.question}
                                        </h3>
                                        <div
                                            className="text-muted-foreground pl-8 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-muted-foreground">
                                    No FAQs available at the moment.
                                </p>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </>
    );
}
