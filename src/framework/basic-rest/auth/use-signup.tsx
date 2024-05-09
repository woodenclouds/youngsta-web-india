import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

export interface SignUpInputType {
    email: string;
    password: string;
    first_name: string;
    last_name: string
    phone_number: string;
    country_code: string;
}
async function signUp(input: SignUpInputType) {
    return http.post(API_ENDPOINTS.REGISTER, input);
}
export const useSignUpMutation = () => {
    const { setModalView } = useUI();

    return useMutation({
        mutationFn: (input: SignUpInputType) => signUp(input),
        onSuccess: (data, variables) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                Cookies.set("signup_mail", variables.email);
                setModalView("ENTER_OTP");
            }
        },
        onError: (data) => {
        },
    });
};
