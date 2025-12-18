"use client";

import { useState, useEffect } from "react";
import AuroraHero from "@/components/premium/AuroraHero";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, PlayCircle, Image as ImageIcon } from "lucide-react";
import { useGallery } from "@/hooks/useGallary.js";
import { useVideos } from "@/hooks/useVideos.js";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const IMAGES_DATA = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1615811361269-669f43e3e2a9?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("photos");
  const {
    galleryImages: images = [...IMAGES_DATA],
    isLoading: isImagesLoading,
    error: imagesError,
  } = useGallery();

  const { videos, isLoading: isVideosLoading, error: videosError } = useVideos();

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (imagesError) toast.error("Error loading gallery images");
    if (videosError) toast.error("Error loading gallery videos");
  }, [imagesError, videosError]);

  return (
    <>
      <AuroraHero
        title="Our Gallery"
        compact={true}
        backgroundImage="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop"
      />
      <div className="container px-4 mx-auto py-24">
        <div className="text-center mb-12">
          <h2 className="section-title mb-6">Visual Journey</h2>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={activeTab === "photos" ? "default" : "outline"}
              onClick={() => setActiveTab("photos")}
              className={cn(
                "rounded-full px-8",
                activeTab === "photos" ? "bg-primary text-white" : "hover:bg-primary/10"
              )}
            >
              <ImageIcon className="mr-2 h-4 w-4" /> Photos
            </Button>
            <Button
              variant={activeTab === "videos" ? "default" : "outline"}
              onClick={() => setActiveTab("videos")}
              className={cn(
                "rounded-full px-8",
                activeTab === "videos" ? "bg-primary text-white" : "hover:bg-primary/10"
              )}
            >
              <PlayCircle className="mr-2 h-4 w-4" /> Videos
            </Button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "photos" ? (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {isImagesLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl overflow-hidden shadow-lg w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px]"
                  >
                    <Skeleton className=" w-full h-full" />
                  </div>
                ))
                : images.map((image, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.3, delay: (i % 4) * 0.1 }}
                    className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px] cursor-pointer"
                    onClick={() => setSelectedImage(image.image)}
                  >
                    <img
                      src={image.image}
                      alt={`Gallery ${i + 1}`}
                      onError={(e) =>
                        (e.target.src = "https://placehold.co/600x600?text=No+Image")
                      }
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </motion.div>
                ))}
            </motion.div>
          ) : (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {isVideosLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-video w-full rounded-2xl" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                ))
              ) : videos && videos.length > 0 ? (
                videos.map((video, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-orange-50 relative hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
                      <a href={video.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group/card">
                        {/* Image: Always visible */}
                        <img
                          src={`https://img.youtube.com/vi/${video.url.split('v=')[1]?.split('&')[0] || 'default'}/maxresdefault.jpg`}
                          onError={(e) => e.target.style.display = 'none'}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />

                        {/* Play Button: Always visible, centered */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 group-hover/card:bg-black/40 transition-colors">
                          <PlayCircle className="w-16 h-16 text-white drop-shadow-lg group-hover/card:scale-110 transition-transform duration-300" />
                        </div>
                      </a>
                    </div>
                    <h3 className="mt-4 text-xl font-bold group-hover:text-primary transition-colors">{video.title}</h3>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground py-12">
                  No videos available at the moment.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
                const currentIndex = images.findIndex(
                  (img) => img.image === selectedImage,
                );
                const prevIndex =
                  (currentIndex - 1 + images.length) % images.length;
                setSelectedImage(images[prevIndex].image);
              }}
              className="absolute left-4 z-20 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = images.findIndex(
                  (img) => img.image === selectedImage,
                );
                const nextIndex = (currentIndex + 1) % images.length;
                setSelectedImage(images[nextIndex].image);
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
                onError={(e) => (e.target.src = "https://placehold.co/600x600?text=No+Image")}
                className="w-full h-full object-contain max-h-[90vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
