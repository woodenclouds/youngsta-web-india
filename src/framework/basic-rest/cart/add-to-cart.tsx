import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface addCartInputType {}
async function addToCart(id: string) {
    return http.post(`${API_ENDPOINTS.ADD_TO_CART}${id}/`);
}
export const useAddToCartMutation = () => {
    return useMutation({
        mutationFn: (id: string) => addToCart(id),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
            }
        },
        onError: (data) => {
            console.log(data, "add cart error response");
        },
    });
};
