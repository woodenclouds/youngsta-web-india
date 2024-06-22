import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async ({
  queryKey,
}: {
  queryKey: [string, QueryOptionsType];
}) => {
  const [, options] = queryKey;
  const queryString = Object.entries(options)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const {
    data: {
      app_data: { data },
    },
  } = await http.get(
    `${API_ENDPOINTS.PRODUCTS}${queryString ? `?${queryString}` : ""}`
  );

  return {
    data,
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS, options],
    queryFn: fetchProducts,
  });
};

export { useProductsQuery, fetchProducts };
