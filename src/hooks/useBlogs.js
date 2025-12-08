import { useQuery } from "@tanstack/react-query";
import { getBlogs, getBlogsBySlug } from "@/services/apiNews.js";

export function useBlogs(slug = null) {
  const {
    data: blogData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", slug],
    queryFn: slug !== null ? () => getBlogsBySlug(slug) : getBlogs,
  });

  return { blogData, isLoading, error };
}
