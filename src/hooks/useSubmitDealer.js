import { useMutation } from "@tanstack/react-query";
import { submitDealerForm } from "@/services/apiDealer.js";
import toast from "react-hot-toast";

export function useSubmitDealer() {
    const mutation = useMutation({
        mutationFn: submitDealerForm,
        onSuccess: (data) => {
            console.log("Dealer form response:", data);
            toast.success("Application submitted successfully! Our team will contact you.");
        },
        onError: (error) => {
            console.error("Submission error:", error);
            toast.error("Failed to submit application. Please try again.");
        },
    });

    return mutation;
}
