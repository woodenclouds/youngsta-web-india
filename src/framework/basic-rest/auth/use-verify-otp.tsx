import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export interface LoginInputType {
    otp: string;
    email: string;
}
async function verify(input: LoginInputType) {
    return http.post(API_ENDPOINTS.VERIFY_OTP, input);
}

export const useVerifyMutation = () => {
    const { authorize, closeModal } = useUI();
    return useMutation({
        mutationFn: (input: LoginInputType) => verify(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                Cookies.remove("signup_mail");
                Cookies.set(
                    "auth_token",
                    data?.data?.app_data?.data?.access_token
                );
                Cookies.set(
                    "refferal_code",
                    data?.data?.app_data?.data?.refferal_code
                );

                authorize();
                closeModal();
            }
        },
        onError: (data) => {
        },
    });
};
