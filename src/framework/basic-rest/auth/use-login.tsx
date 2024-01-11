import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

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
    return useMutation({
        mutationFn: (input: LoginInputType) => login(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                Cookies.set(
                    "auth_token",
                    data?.data?.app_data?.data?.access_token
                );
                authorize();
                closeModal();
            }
        },
        onError: (data) => {
            console.log(data, "login error response");
        },
    });
};
