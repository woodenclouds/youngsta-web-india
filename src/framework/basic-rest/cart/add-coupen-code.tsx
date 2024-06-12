import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface AddCoupenInputType {
    coupen_code: string;  
}

async function addCoupen(coupen: string) {
    return http.post(API_ENDPOINTS.ADD_COUPEN, {
        coupon_code: coupen,  
    });
}

export const useAddCoupenMutation = (onSuccess: any, onError: any) => {
    return useMutation({
        mutationFn: (input: AddCoupenInputType) => addCoupen(input.coupen_code),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                onSuccess();
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
