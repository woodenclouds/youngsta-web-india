import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
    const response = await http.post(API_ENDPOINTS.ADD_ADDRESS, input);
    console.log(response.data, "response");
    
    if (response.data?.app_data?.StatusCode === 6000) {
        return response.data;
    }
    return Promise.reject(response.data)
}
export const useAddAddressMutation = (onSuccess: any) => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (input: AddAddressInputType) => addAddress(input),
        onSuccess: (data) => {
            onSuccess();
            query.invalidateQueries({queryKey:['addresses']})
        },
        onError: (data) => {
            if(Object.keys(data?.app_data?.data).length){
                toast.error(data?.app_data?.data[Object.keys(data?.app_data?.data)[0]][0]);
                
            }
        },
    });
};
