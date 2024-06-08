import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

async function cancelFunction(id: any) {
    return http.post(`${API_ENDPOINTS.CANCEL_ITEM}${id}/`, {});
}
export const useCancelMutation = (onSuccess: any, onError: any) => {
    return useMutation({
        mutationFn: (input: any) => cancelFunction(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                onSuccess();
            } else {
                onError(data?.data?.app_data);
            }
        },
        onError: () => {},
    });
};
