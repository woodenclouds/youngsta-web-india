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
        mutationFn: (input: LoginInputType) => {
            setLoading(true);
            return login(input);
        },
        onSuccess: (data) => {
            setLoading(false);
            if (data?.data?.app_data?.StatusCode === 6000) {
                Cookies.set(
                    "auth_token",
                    data?.data?.app_data?.data?.access_token
                );
                authorize();
                closeModal();
            } else {
                setError(
                    data?.data?.app_data?.data?.message || "An error occurred"
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
