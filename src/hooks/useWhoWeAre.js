import { useQuery } from "@tanstack/react-query";
import { getAbout } from "@/services/apiAbout.js";

export function useWhoWeAre() {
  const {
    data: about,
    isLoading,
    error,
  } = useQuery({ queryKey: ["about"], queryFn: getAbout });

  return { about, isLoading, error };
}
