import { useQuery } from "@tanstack/react-query";
import { getNews, getNewsBySlug } from "@/services/apiNews.js";

export function useNews(slug = null) {
  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news", slug],
    queryFn: slug !== null ? () => getNewsBySlug(slug) : getNews,
  });

  return { news, isLoading, error };
}
