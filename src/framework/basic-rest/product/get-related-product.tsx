import { QueryOptionsType, Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchRelatedProducts = async ({
    queryKey,
}: {
    queryKey: [string, { slug: string }];
}) => {
    const [, options] = queryKey;
    console.log("options", options);

    const {
        data: {
            app_data: { data },
        },
    } = await http.get(
        `${API_ENDPOINTS.RELATED_PRODUCTS}?product_code=${options?.slug}`
    );
    return data;
};
export const useRelatedProductsQuery = (options: QueryOptionsType) => {
    return useQuery<Product[], Error>({
        queryKey: [API_ENDPOINTS.RELATED_PRODUCTS, options],
        queryFn: fetchRelatedProducts,
    });
};
