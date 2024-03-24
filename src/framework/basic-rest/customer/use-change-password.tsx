import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface ChangePasswordInputType {
    new_password: string;
    old_password: string;
}
async function changePassword(input: ChangePasswordInputType) {
    return http.post(API_ENDPOINTS.CHANGE_PASSWORD, input);
}
export const useChangePasswordMutation = (renderToast?: any) => {
    return useMutation({
        mutationFn: (input: ChangePasswordInputType) => changePassword(input),
        onSuccess: () => {
            renderToast("Password changed successfully");
        },
        onError: (response) => {
            renderToast(response?.response?.data?.app_data?.data?.message);
        },
    });
};
