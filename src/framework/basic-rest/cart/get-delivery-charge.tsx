import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "@tanstack/react-query";

export const getDeliveryCharges = async (payload: object) => {
  const { data } = await http.post(API_ENDPOINTS.GET_DELIVERY_CHARGE, payload);

  if (data?.app_data?.StatusCode === 6000) {
    return data;
  } else {
    throw new Error(data)
  }
};
export const useGetDeliveryCharge = (
  onSuccess: (data:any) => void | any,
  onError: (error:any) => void | any
) => {
  return useMutation<any, Error, void, unknown>({
    // queryKey: [API_ENDPOINTS.GET_DELIVERY_CHARGE, options],
    mutationFn: (payload: any) => getDeliveryCharges(payload),
    onSuccess: (data) => {
      if (data?.app_data?.StatusCode === 6000) {
        onSuccess(data?.app_data?.data);
      } else {
        onError(data?.app_data?.message);
      }
    },
    onError: (err:any) => {
        onError(err?.message || err?.app_data?.message);
    },
  });
};
