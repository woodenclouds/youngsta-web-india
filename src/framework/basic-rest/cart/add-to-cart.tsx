import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface addCartInputType {
  attribute_id: string;
  quantity: number;
  id?: number;
  referral_code?: string;
}
async function addToCart(input: any) {
  let id = input?.id;
  const body: addCartInputType = {
    attribute_id: input?.attribute_id,
    quantity: input?.quantity,
  };
  input?.referral_code && (body["referral_code"] = input?.referral_code);
  return http.post(`${API_ENDPOINTS.ADD_TO_CART}${id}/`, body);
}

export const useAddToCartMutation = (onSuccess: any, onError: any) => {
  return useMutation({
    mutationFn: (input: addCartInputType) => addToCart(input),
    onSuccess: (data) => {
      if (data?.data?.app_data?.StatusCode === 6000) {
        onSuccess();
      } else {
        onError(data?.data?.app_data?.data);
      }
    },
    onError: (data) => {},
  });
};
