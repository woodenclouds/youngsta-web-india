import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface AddAddressInputType {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    save: boolean;
    note: string;
}

async function addAddress(input: AddAddressInputType) {
    return http.post(API_ENDPOINTS.ADD_ADDRESS, input);
    return input;
}
export const useAddAddressMutation = (onSuccess: any) => {
    return useMutation({
        mutationFn: (input: AddAddressInputType) => addAddress(input),
        onSuccess: (data) => {
            console.log(data, "ADD_ADDRESS success response");
            onSuccess();
        },
        onError: (data) => {
            console.log(data, "ADD_ADDRESS error response");
        },
    });
};
