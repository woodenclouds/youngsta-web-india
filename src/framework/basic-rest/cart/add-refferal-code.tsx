import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface AddReferralInputType {
    referral_code: string;
}

async function addReferral(referral: string) {
    return http.post(API_ENDPOINTS.ADD_REFFERAL, {
         referral_code: referral,
    });
}

export const useAddReferralMutation = (onSuccess: any, onError: any) => {
    return useMutation({
        mutationFn: (input: AddReferralInputType) => addReferral(input.referral_code),
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
