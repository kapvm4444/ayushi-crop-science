import { useQuery } from "@tanstack/react-query";
import { getCareer, getCareerBySlug } from "@/services/apiCareer.js";

export function useCareer(slug) {
  const {
    data: career,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["career", slug],
    queryFn: slug ? () => getCareerBySlug(slug) : getCareer,
  });

  return { career, isLoading, error };
}
