import { useQuery } from "@tanstack/react-query";
import { getNews, getNewsBySlug } from "@/services/apiNews.js";

export function useNews(slug = null, page = 1) {
  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news", slug, page],
    queryFn: slug !== null ? () => getNewsBySlug(slug) : () => getNews(page),
    keepPreviousData: true,
  });

  return { news, isLoading, error };
}
