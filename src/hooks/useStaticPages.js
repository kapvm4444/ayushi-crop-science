import { useQuery } from "@tanstack/react-query";
import { getStaticPages } from "@/services/apiStaticPages.js";

export function useStaticPages() {
  const {
    data: staticPageData,
    isLoading,
    error,
  } = useQuery({ queryKey: ["static-pages"], queryFn: getStaticPages });

  console.log(staticPageData);

  return { staticPageData, isLoading, error };
}
