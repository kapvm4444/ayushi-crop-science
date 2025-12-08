import { useState } from "react";
import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useGallery } from "@/hooks/useGallary.js";

const IMAGES_DATA = [
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615811361269-669f43e3e2a9?q=80&w=2070&auto=format&fit=crop",
];

export default function Gallery() {
  const { galleryImages: images, isLoading, error } = useGallery();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Layout>
      <AuroraHero
        title="Our Gallery"
        subtitle="Glimpses of our facilities, fields, and the impact we create."
        backgroundImage="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop"
      />
      <div className="container px-4 mx-auto py-24">
        <div className="text-center mb-16">
          <h2 className="section-title">Visual Journey</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {images.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px] cursor-pointer"
              onClick={() => setSelectedImage(image.image)}
            >
              <img
                src={image.image}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = images.indexOf(selectedImage);
                const prevIndex =
                  (currentIndex - 1 + images.length) % images.length;
                setSelectedImage(images[prevIndex]);
              }}
              className="absolute left-4 z-20 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = images.indexOf(selectedImage);
                const nextIndex = (currentIndex + 1) % images.length;
                setSelectedImage(images[nextIndex]);
              }}
              className="absolute right-4 z-20 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-xl overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={selectedImage}
                alt="Gallery Preview"
                className="w-full h-full object-contain max-h-[90vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
