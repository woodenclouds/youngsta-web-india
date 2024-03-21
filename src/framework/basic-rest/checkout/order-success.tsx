import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

async function orderSuccess(input: any) {
    return http.post(`${API_ENDPOINTS.SUCCESS_CHECKOUT}${input}`);
}
export const useOrderSuccessMutation = (onSuccess?: any) => {
    return useMutation({
        mutationFn: (input: any) => orderSuccess(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
            }
        },
        onError: (data) => {
            console.log(data, "error response");
        },
    });
};
