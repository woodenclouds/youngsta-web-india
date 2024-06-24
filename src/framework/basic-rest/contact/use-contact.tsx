import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface LoginInputType {
    name: string;
    email: string;
    subject: string;
    message: string;
}

async function submitContact(input: LoginInputType) {
    return http.post(API_ENDPOINTS.CONTACT, input);
}

export const useContactMutation = () => {
    return useMutation({
        mutationFn: (input: LoginInputType) => submitContact(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                toast.success("Your message has been sent successfully!");
            } else {
                toast.error(data?.data?.app_data?.data?.message);
            }
        },
        onError: () => {
            toast.error("Failed to send your message. Please try again.");
        },
    });
};
