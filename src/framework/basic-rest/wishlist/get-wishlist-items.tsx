import { QueryOptionsType, Category } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchWishlistItems = async () => {
    const { data } = await http.get(API_ENDPOINTS.VIEW_WISHLIST_ITEMS);
    return data as Category[];
};
export const useFetchWishlistItemsQuery = (options: QueryOptionsType) => {
    return useQuery<Category[], Error>({
        queryKey: [API_ENDPOINTS.VIEW_WISHLIST_ITEMS, options],
        queryFn: fetchWishlistItems,
    });
};
