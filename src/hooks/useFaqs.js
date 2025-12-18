import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "@/services/apiContact.js";

export function useFaqs() {
    const {
        data: faqs,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["faqs"],
        queryFn: getFaqs,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    return { faqs, isLoading, error };
}
