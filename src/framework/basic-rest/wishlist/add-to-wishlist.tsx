import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface addWishlistInputType {
    
    id: number;
}
async function addToWishList(input: addWishlistInputType) {
    let id = input?.id;
    return http.post(`${API_ENDPOINTS.ADD_WISHLIST_ITEMS}${id}/`, {
    });
}

export const useAddToWishlistMutation = () => {
    return useMutation({
        mutationFn: (input: addWishlistInputType) => addToWishList(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
            }
        },
        onError: (data) => {
            console.log(data, "add wishlist error response");
        },
    });
};
