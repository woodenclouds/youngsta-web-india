import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export interface LoginInputType {
    email: string;
    password: string;
    remember_me: boolean;
}
async function login(input: LoginInputType) {
    return http.post(API_ENDPOINTS.LOGIN, input);
}
export const useLoginMutation = () => {
    const { authorize, closeModal } = useUI();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);

    const mutation = useMutation({
        // Modify this function to also return the input email
        mutationFn: async (input: LoginInputType) => {
            setLoading(true);
            const response = await login(input);
            // Return both the response and the input email
            return { response, email: input.email };
        },
        onSuccess: ({ response, email }) => {
            // Destructure to get the email
            setLoading(false);
            if (response?.data?.app_data?.StatusCode === 6000) {
                Cookies.set(
                    "auth_token",
                    response?.data?.app_data?.data?.access_token
                );
                Cookies.set(
                    "refferal_code",
                    response?.data?.app_data?.data?.refferal_code
                );
                Cookies.set("email", email);
                authorize();
                closeModal();
            } else {
                setError(
                    response?.data?.app_data?.data?.message ||
                        "An error occurred"
                );
            }
        },
        onError: (error: any) => {
            setLoading(false);
            const errorMessage =
                error?.response?.data?.message || "An error occurred";
            setError(errorMessage);
        },
    });

    return {
        ...mutation,
        isLoading,
        error,
        setError,
    };
};
