"use client";
import AuroraHero from "@/components/premium/AuroraHero"

export default function AboutLayout({ title, subtitle, image, children }) {
    return (
        <>
            <AuroraHero
                title={title}
                compact={true}
                backgroundImage={image || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"}
            />
            <div className="container px-4 mx-auto py-24">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    {children}
                </div>
            </div>
        </>
    )
}
