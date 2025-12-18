import { useQuery } from "@tanstack/react-query";
import { getEvent, getEventBySlug } from "@/services/apiNews.js";

export function useEvent(slug = null, page = 1) {
  const {
    data: eventData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", slug, page],
    queryFn: slug !== null ? () => getEventBySlug(slug) : () => getEvent(page),
    keepPreviousData: true,
  });

  return { eventData, isLoading, error };
}
