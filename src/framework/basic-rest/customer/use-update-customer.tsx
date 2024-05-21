import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface UpdateUserType {
    firstName: string;
    lastName: string;
    displayName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
}
async function updateUser(input: UpdateUserType) {
    const res = await http.post(API_ENDPOINTS.UPDATE_ACCOUNT, input);
    console.log("useUpdateUserMutation", res);
    return res.data;
}
export const useUpdateUserMutation = (onSuccess?: any) => {
    return useMutation({
        mutationFn: (input: UpdateUserType) => updateUser(input),
        onSuccess: (data) => {
            onSuccess(data?.app_data?.data);
        },
        onError: (data) => {},
    });
};
