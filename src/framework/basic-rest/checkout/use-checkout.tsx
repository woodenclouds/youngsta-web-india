// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface CheckoutInputType {
  address_id:string
}


async function checkout(input: CheckoutInputType) {
  // return http.post(API_ENDPOINTS.ChangeEmail, input);
  return input;
}
export const useCheckoutMutation = () => {
  return useMutation({
    mutationFn: (input: CheckoutInputType) => checkout(input),
    onSuccess: (data) => {
      if (data)
    },
    onError: (data) => {
    },
  });
};
