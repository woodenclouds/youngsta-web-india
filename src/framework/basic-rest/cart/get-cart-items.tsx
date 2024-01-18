import { QueryOptionsType, Category } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchCartItems = async () => {
    const { data } = await http.get(API_ENDPOINTS.VIEW_CART_ITEMS);
    console.log("datadata", data);
    return data as Category[];
};
export const useFetchCartItemsQuery = (options: QueryOptionsType) => {
    return useQuery<Category[], Error>({
        queryKey: [API_ENDPOINTS.VIEW_CART_ITEMS, options],
        queryFn: fetchCartItems,
    });
};
