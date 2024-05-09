import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    const queryClient = useQueryClient(); // Access the query client

    return useMutation({
        mutationFn: (input: editCartInputType) => editCart(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.VIEW_CART_ITEMS],
                });
            }
        },
        onError: (data) => {},
    });
};
