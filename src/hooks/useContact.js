import { useQuery } from "@tanstack/react-query";
import { getContactInfo } from "@/services/apiContact.js";

export function useContact() {
  const {
    data: contactInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contact"],
    queryFn: getContactInfo,
  });

  return { contactInfo, isLoading, error };
}
