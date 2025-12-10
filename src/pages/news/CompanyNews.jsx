import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useNews } from "@/hooks/useNews.js";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyNews() {
  const { news, isLoading, error } = useNews();

  if (isLoading) {
    return (
      <Layout>
        <AuroraHero
          title="Company News"
          compact={true}
          backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
        />
        <div className="container px-4 mx-auto py-24">
          <div className="text-center mb-16">
            <h2 className="section-title">Latest News</h2>
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
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <AuroraHero
          title="Company News"
          compact={true}
          backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
        />
        <div className="container px-4 mx-auto py-24 text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Error loading news
          </h2>
          <p className="text-muted-foreground mt-2">Please try again later.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <AuroraHero
        title="Company News"
        compact={true}
        backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
      />
      <div className="container px-4 mx-auto py-24">
        <div className="text-center mb-16">
          <h2 className="section-title">Latest News</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {news.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ willChange: "opacity, transform" }}
              className="bg-card border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px]"
            >
              <Link to={`/news/${item.slug}`}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) =>
                      (e.target.src = "https://placehold.co/600x400?text=News")
                    }
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {item.date}
                    </span>
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
      </div>
    </Layout>
  );
}
