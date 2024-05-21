import { Order } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchOrder = async (_id: string) => {
    const response = await http.get(`${API_ENDPOINTS.SINGLE_ORDERS}${_id}/`);
    const data = response.data;

    if (data?.app_data?.StatusCode === 6000) {
        return data.app_data.data;
    } else {
        return [];
    }
};
export const useOrderQuery = (id: string) => {
    return useQuery<Order, Error>({
        queryKey: [API_ENDPOINTS.SINGLE_ORDERS, id],
        queryFn: () => fetchOrder(id),
    });
};
