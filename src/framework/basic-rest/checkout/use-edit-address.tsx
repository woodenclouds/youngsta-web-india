import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function addAddress(input: any) {
    return http.put(`${API_ENDPOINTS.EDIT_ADDRESS}${input?.id}/`, input);
}
export const useEditAddressMutation = (onSuccess: any, onError: any) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (input: any) => addAddress(input),
        onSuccess: (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                queryClient.invalidateQueries(['addresses'])
                onSuccess({ message: "Address updated successfully" });
            } else {
                onError(data?.data?.app_data);
            }
        },
        onError: () => {},
    });
};
