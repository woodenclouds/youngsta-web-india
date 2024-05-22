import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

async function addAddress(id: any) {
    return http.delete(`${API_ENDPOINTS.DELETE_ADDRESS}${id}/`, {});
}
export const useDeleteAddressMutation = (onSuccess: any, onError: any) => {
    return useMutation({
        mutationFn: (input: any) => addAddress(input),
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
