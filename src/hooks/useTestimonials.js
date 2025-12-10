import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/services/apiTestimonials.js";

export function useTestimonials() {
  const {
    data: testimonials,
    isLoading,
    error,
  } = useQuery({ queryKey: ["testimonials"], queryFn: getTestimonials });

  return { testimonials, isLoading, error };
}
