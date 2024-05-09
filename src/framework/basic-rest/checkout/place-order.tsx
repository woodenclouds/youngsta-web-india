import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

async function placeOrder(input: any) {
    return http.post(API_ENDPOINTS.CHECKOUT, input);
}
export const usePlaceOrderMutation = (onSuccess: any) => {
    return useMutation({
        mutationFn: (input: any) => placeOrder(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                onSuccess(data?.data?.app_data?.data);
            }
        },
        onError: (data) => {
        },
    });
};
