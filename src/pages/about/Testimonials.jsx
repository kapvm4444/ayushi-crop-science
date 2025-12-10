import AboutLayout from "./AboutLayout";
import { Star, Quote, User } from "lucide-react";
import { motion } from "framer-motion";
import { useTestimonials } from "@/hooks/useTestimonials.js";

export default function Testimonials() {
  const { testimonials, isLoading, error } = useTestimonials();
  console.log(testimonials); //testimonials data (array)

  return (
    <AboutLayout
      title="Testimonials"
      subtitle="Hear from the farmers who trust us."
      image="https://images.unsplash.com/photo-1595839088656-787c886c965e?q=80&w=2070&auto=format&fit=crop"
    >
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-xl leading-relaxed text-muted-foreground">
          Our success is measured by the success of our farmers. Here are some
          stories from the field that inspire us to work harder every day.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-card border p-8 rounded-3xl shadow-sm space-y-4 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1rem)]"
            >
              <div className="h-10 w-10 bg-primary/10 rounded-full animate-pulse" />
              <div className="h-20 bg-muted rounded-xl animate-pulse" />
              <div className="flex items-center gap-4 mt-auto pt-6 border-t">
                <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id || i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border p-8 rounded-3xl shadow-sm hover:shadow-xl flex flex-col group w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1rem)]"
            >
              <Quote className="h-10 w-10 text-primary/20 mb-6 group-hover:text-primary/40 transition-colors" />
              <p className="text-lg italic mb-6 flex-grow leading-relaxed text-muted-foreground">
                &quot;{t.content || t.text}&quot;
              </p>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t">
                <div className="h-12 w-12 rounded-full bg-secondary overflow-hidden shrink-0">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      onError={(e) =>
                      (e.target.src =
                        "https://placehold.co/100x100?text=User")
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-xs text-primary font-medium uppercase tracking-wider">
                    {t.role}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5"></div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AboutLayout>
  );
}
