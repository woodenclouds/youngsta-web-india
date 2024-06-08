import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

async function returnFunction(id: any) {
    return http.post(`${API_ENDPOINTS.RETURN_ITEM}${id}/`, {});
}
export const useReturnMutation = (onSuccess: any, onError: any) => {
    return useMutation({
        mutationFn: (input: any) => returnFunction(input),
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
