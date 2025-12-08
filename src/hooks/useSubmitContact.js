import { useMutation } from "@tanstack/react-query";
import { submitContactForm } from "@/services/apiContact.js";
import toast from "react-hot-toast";

export function useSubmitContact() {
    const mutation = useMutation({
        mutationFn: submitContactForm,
        onSuccess: (data) => {
            console.log("Contact form response:", data);
            toast.success("Message sent successfully! We will get back to you soon.");
        },
        onError: (error) => {
            console.error("Submission error:", error);
            toast.error("Failed to send message. Please try again.");
        },
    });

    return mutation;
}
