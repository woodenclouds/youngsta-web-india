import { QueryOptionsType } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchHeaderMenu = async () => {
    const {
        data: {
            app_data: { data },
        },
    } = await http.get(API_ENDPOINTS.HEADER_MENU);
    return data;
};

export const useHeaderMenuQuery = (options: QueryOptionsType) => {
    return useQuery<any, Error>({
        queryKey: [API_ENDPOINTS.HEADER_MENU, options],
        queryFn: fetchHeaderMenu,
    });
};
