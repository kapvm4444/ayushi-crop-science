import { useQuery } from "@tanstack/react-query";
import { getEvent, getEventBySlug } from "@/services/apiNews.js";

export function useEvent(slug = null) {
  const {
    data: eventData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", slug],
    queryFn: slug !== null ? () => getEventBySlug(slug) : getEvent,
  });

  return { eventData, isLoading, error };
}
