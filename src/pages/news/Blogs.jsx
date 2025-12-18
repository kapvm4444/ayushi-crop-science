"use client";

import { useState } from "react";
import AuroraHero from "@/components/premium/AuroraHero";
import { motion } from "framer-motion";
import { Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useBlogs } from "@/hooks/useBlogs.js";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import { Button } from "@/components/ui/button";

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const { blogData, isLoading, error } = useBlogs(null, currentPage);
  const blogs = blogData?.data || [];
  const totalPages = blogData?.last_page || 1;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <>
        <AuroraHero
          title="Blogs & Insights"
          compact={true}
          backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
        />
        <div className="container px-4 mx-auto py-24">
          <div className="text-center mb-16">
            <h2 className="section-title">Recent Articles</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border rounded-2xl overflow-hidden shadow-lg w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px]"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AuroraHero
          title="Blogs & Insights"
          compact={true}
          backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
        />
        <div className="container px-4 mx-auto py-24 text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Error loading blogs
          </h2>
          <p className="text-muted-foreground mt-2">Please try again later.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AuroraHero
        title="Blogs & Insights"
        compact={true}
        backgroundImage="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop"
      />
      <div className="container px-4 mx-auto py-24">
        <div className="text-center mb-16">
          <h2 className="section-title">Recent Articles</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {blogs.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ willChange: "opacity, transform" }}
              className="bg-card border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px]"
            >
              <Link href={`/blogs/${item.slug}`}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) =>
                      (e.target.src = "https://placehold.co/600x400?text=Blog")
                    }
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {item.date}
                    </span>
                    {item.author && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> {item.author}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {item.short_description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
