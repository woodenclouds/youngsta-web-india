import { QueryOptionsType, Category } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchOrderedItems = async () => {
    const { data } = await http.get(API_ENDPOINTS.VIEW_ORDERS);
    return data as Category[];
};
export const useOrderedItemsQuery = (options: QueryOptionsType) => {
    return useQuery<Category[], Error>({
        queryKey: [API_ENDPOINTS.VIEW_ORDERS, options],
        queryFn: fetchOrderedItems,
    });
};
