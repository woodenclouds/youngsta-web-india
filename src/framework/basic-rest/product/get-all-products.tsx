import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchProducts = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: [string, QueryOptionsType];
  pageParam: number;
}) => {
  const [, options] = queryKey;
  const queryString = Object.entries({ ...options, page: pageParam })
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  console.log(pageParam);

  const {
    data: {
      app_data: { data, pagination_data },
    },
  } = await http.get(
    `${API_ENDPOINTS.PRODUCTS}${queryString ? `?${queryString}` : ""}`
  );

  return {
    data,
    pagination_data,
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  // return useQuery<Product[], Error>({
  //   queryKey: [API_ENDPOINTS.PRODUCTS, options],
  //   queryFn: fetchProducts,
  // });
  return useInfiniteQuery({
    queryKey: [API_ENDPOINTS.PRODUCTS, options],
    queryFn: ({ queryKey, pageParam }) =>
      fetchProducts({ queryKey, pageParam }),
    getNextPageParam: ({ pagination_data }) => {
      console.log({ has_next_page: pagination_data?.has_next_page });

      if (pagination_data?.has_next_page) {
        return Number(pagination_data?.current_page || 0) + 1;
      }
      return null;
    },
    getPreviousPageParam: ({ pagination_data }) => {
      if (pagination_data?.has_previous_page) {
        return Number(pagination_data?.current_page || 0) + 1;
      }
      return null;
    },
  });
};

export { useProductsQuery, fetchProducts };
