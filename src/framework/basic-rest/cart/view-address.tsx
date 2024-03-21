import { Address } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface UseAddressesOptions extends UseQueryOptions<Address[]> {
    limit?: boolean;
}

export const fetchAddresses = async ({
    queryKey,
}: {
    queryKey: [string, UseAddressesOptions];
}) => {
    const [, options] = queryKey;

    try {
        const response = await http.get(API_ENDPOINTS.VIEW_ADDRESS, {
            params: {
                limit: options?.limit,
            },
        });
        const data = response.data;

        if (data?.app_data?.StatusCode === 6000) {
            return data.app_data.data.addresses as Address[];
        } else {
            return [] as Address[];
        }
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return [] as Address[];
    }
};

export const useAddresses = (options?: any) => {
    return useQuery({
        queryKey: ["addresses", options],
        queryFn: fetchAddresses,
        ...options,
    });
};
