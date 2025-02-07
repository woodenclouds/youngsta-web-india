import { QueryOptionsType, Category } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchCartItems = async () => {
    const {
        data,
        data: {
            app_data: {
                data:cart_items={}
                // data: { cart_items },
            }={},
        },
    } = await http.get(API_ENDPOINTS.VIEW_CART_ITEMS);

    if (data?.app_data?.StatusCode === 6000) {
        return cart_items;
    } else {
        return {};
    }
};
export const useFetchCartItemsQuery = (options: any) => {
    return useQuery<any, Error>({
        queryKey: [API_ENDPOINTS.VIEW_CART_ITEMS, options],
        queryFn: fetchCartItems,
    });
};
