import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchProduct = async (_slug: string) => {
    const {
        data: {
            StatusCode,
            app_data: { data },
        },
    } = await http.get(`${API_ENDPOINTS.PRODUCTS}${_slug}/`);
    if (StatusCode === 6000) {
        return data;
    } else {
        return data;
    }
};
export const useProductQuery = (slug: string) => {
    return useQuery<Product, Error>({
        queryKey: [API_ENDPOINTS.PRODUCT, slug],
        queryFn: () => fetchProduct(slug),
    });
};
