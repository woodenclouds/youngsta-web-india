import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function cancelFunction(id: any) {
    return http.post(`${API_ENDPOINTS.CANCEL_ITEM}${id}/`, {});
}
export const useCancelMutation = (onSuccess: any, onError: any) => {
    const client = useQueryClient()
    return useMutation({
        mutationFn: (input: any) => cancelFunction(input),
        onSuccess: (data) => {
            console.log(data);
            if (data?.data?.StatusCode === 6000) {
                client.invalidateQueries(API_ENDPOINTS.SINGLE_ORDERS)
                onSuccess();
            } else {
                onError(data?.data);
            }
        },
        onError: () => {},
    });
};
