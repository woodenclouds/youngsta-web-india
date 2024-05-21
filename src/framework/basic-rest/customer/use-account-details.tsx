import { QueryOptionsType, Category } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchOrderedItems = async () => {
    const {
        data: {
            app_data: { data },
        },
    } = await http.get(API_ENDPOINTS.EDIT_ACCOUNT);
    return data as Category[];
};
export const useAccountDetailsQuery = (options: QueryOptionsType) => {
    return useQuery<Category[], Error>({
        queryKey: [API_ENDPOINTS.EDIT_ACCOUNT, options],
        queryFn: fetchOrderedItems,
    });
};
