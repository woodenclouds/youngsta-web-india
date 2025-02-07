import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface AddCoupenInputType {
    coupen_code: string;  
}

async function addCoupen(coupen: string) {
    return http.post(API_ENDPOINTS.ADD_COUPEN, {
        coupon_code: coupen,  
    });
}

export const useAddCoupenMutation = (onSuccess: any, onError: any) => {
    const queryClient = useQueryClient(); // Access the query client

    return useMutation({
        mutationFn: (input: AddCoupenInputType) => addCoupen(input.coupen_code),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.VIEW_CART_ITEMS],
                });
                onSuccess(data);
            } else if (data?.data?.app_data?.StatusCode === 6001) {
                onError(data?.data?.app_data?.data?.message);
            } else {
                onError(data?.data?.app_data?.data);
            }
        },
        onError: (data) => {
            onError(data);
        },
    });
};
