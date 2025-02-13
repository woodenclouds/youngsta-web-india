import {  OrderTrackingDetails } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchOrderTrackingDetails = async (shipment_id: string) => {
    const response = await http.get(`${API_ENDPOINTS.TRACK_ORDER}${shipment_id}/`);
    const data = response.data;

    if (data?.app_data?.StatusCode === 6000) {
        return data?.app_data?.data;
    } else {
        return [];
    }
};
export const useTrackOrder = (id: string) => {
    return useQuery<OrderTrackingDetails, Error>({
        queryKey: [API_ENDPOINTS.TRACK_ORDER, id],
        queryFn: () => fetchOrderTrackingDetails(id),
        enabled:id ? true:false,
    });
};
