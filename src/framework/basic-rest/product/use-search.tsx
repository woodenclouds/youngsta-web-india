import { QueryOptionsType, Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchSearchedProducts = async (options: any) => {
    const { data } = await http.get(
        `${API_ENDPOINTS.PRODUCTS}?search=${options?.search}`
    );
    if (data?.app_data?.StatusCode === 6000) {
        return data.app_data.data;
    } else {
        return [];
    }
};
export const useSearchQuery = (options: any) => {
    return useQuery<Product[], Error>({
        queryKey: [API_ENDPOINTS.PRODUCTS, options],
        queryFn: () => fetchSearchedProducts(options),
    });
};
