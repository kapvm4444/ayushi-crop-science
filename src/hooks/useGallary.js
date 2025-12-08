import { useQuery } from "@tanstack/react-query";
import { getGalleryImages } from "@/services/apiGallary.js";

export function useGallery() {
  const {
    data: galleryImages,
    isLoading,
    error,
  } = useQuery({ queryKey: ["gallery"], queryFn: getGalleryImages });

  console.log(galleryImages);

  return { galleryImages, isLoading, error };
}
