import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface deleteCartInputType {
    id: number;
}
async function deleteFromWishlist(input: deleteCartInputType) {
    let id = input?.id;
    return http.delete(`${API_ENDPOINTS.REMOVE_WISHLIST_ITEMS}${id}/`, {});
}

export const usedeleteWishlistMutation = (onSuccessUpdate: () => void) => {
    return useMutation({
        mutationFn: (input: deleteCartInputType) => deleteFromWishlist(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                onSuccessUpdate(); // Call the function to update the state
            }
            onSuccessUpdate();
        },
        onError: (data) => {
            console.log(data, "add cart error response");
        },
    });
};
