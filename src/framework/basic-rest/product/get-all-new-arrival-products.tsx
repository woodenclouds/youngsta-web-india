import { QueryOptionsType, Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchNewArrivalProducts = async () => {
    const {
        data: {
            app_data: { data, StatusCode },
        },
    } = await http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS);

    if (StatusCode === 6000) {
        return data as Product[];
    } else {
        return [] as Product[];
    }
};

export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {
    return useQuery<Product[], Error>({
        queryKey: [API_ENDPOINTS.PRODUCTS_ANCIENT, options],
        queryFn: fetchNewArrivalProducts,
    });
};
