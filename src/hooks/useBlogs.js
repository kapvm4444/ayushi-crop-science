import { useQuery } from "@tanstack/react-query";
import { getBlogs, getBlogsBySlug } from "@/services/apiNews.js";

export function useBlogs(slug = null, page = 1) {
  const {
    data: blogData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", slug, page],
    queryFn: slug !== null ? () => getBlogsBySlug(slug) : () => getBlogs(page),
    keepPreviousData: true,
  });

  return { blogData, isLoading, error };
}
