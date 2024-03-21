import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface addCartInputType {
    attribute_id: string;
    quantity: number;
    id: number;
}
async function addToCart(input: any) {
    let id = input?.id;
    return http.post(`${API_ENDPOINTS.ADD_TO_CART}${id}/`, {
        attribute_id: input?.attribute_id,
        quantity: input?.quantity,
    });
}

export const useAddToCartMutation = (onSuccess: any, onError: any) => {
    return useMutation({
        mutationFn: (input: addCartInputType) => addToCart(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                onSuccess();
            } else {
                onError(data?.data?.app_data?.data);
            }
        },
        onError: (data) => {
            console.log(data, "add cart error response");
        },
    });
};
