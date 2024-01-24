import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface editCartInputType {
    attribute_id: string;
    quantity: number;
    id: number;
}
async function editCart(input: editCartInputType) {
    let id = input?.id;
    return http.put(`${API_ENDPOINTS.EDIT_CART}${id}/`, {
        attribute_id: input?.attribute_id,
        quantity: input?.quantity,
    });
}

export const useEditCartMutation = () => {
    return useMutation({
        mutationFn: (input: editCartInputType) => editCart(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
            }
        },
        onError: (data) => {
            console.log(data, "add cart error response");
        },
    });
};
