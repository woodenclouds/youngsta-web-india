import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface deleteCartInputType {
    id: number;
}
async function deleteFromCart(input: deleteCartInputType) {
    let id = input?.id;
    return http.post(`${API_ENDPOINTS.REMOVE_FROM_CART}${id}/`, {});
}

export const usedeleteCartMutation = () => {
    return useMutation({
        mutationFn: (input: deleteCartInputType) => deleteFromCart(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
            }
        },
        onError: (data) => {
            console.log(data, "add cart error response");
        },
    });
};
