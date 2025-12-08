import { useMutation } from "@tanstack/react-query";
import { submitCareer } from "@/services/apiCareer.js";
import toast from "react-hot-toast";

export function useSubmitCareer() {
    const mutation = useMutation({
        mutationFn: submitCareer,
        onSuccess: (data) => {
            toast.success("Application submitted successfully!");
        },
        onError: (error) => {
            console.error("Submission error:", error);
            toast.error("Failed to submit application. Please try again.");
        },
    });

    return mutation;
}
