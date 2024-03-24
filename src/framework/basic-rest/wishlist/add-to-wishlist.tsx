import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface addWishlistInputType {
    id: number;
}
async function addToWishList(input: addWishlistInputType) {
    let id = input?.id;
    return http.post(`${API_ENDPOINTS.ADD_WISHLIST_ITEMS}${id}/`, {});
}

export const useAddToWishlistMutation = (onSuccess?: any, onError?: any) => {
    return useMutation({
        mutationFn: (input: addWishlistInputType) => addToWishList(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                onSuccess(data?.data?.app_data);
            } else {
                onError(data?.data?.app_data);
            }
        },
        onError: (data: any) => {
            onError(data?.data?.app_data);
        },
    });
};
