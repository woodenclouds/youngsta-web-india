import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";

export interface CheckoutInput {
    address_id: string;
}

async function verify(input: CheckoutInput) {
    return http.post(API_ENDPOINTS.CHECKOUT, { address: input.input });
}

export const useCheckoutMutation = () => {
    const { authorize, closeModal } = useUI();
    const stripePromise = loadStripe(
        "pk_test_51OZCkbSJAilA93rWtOiZYvAthL2sa9hOQDmaaQKUTAVXku9SGxbQZ6l3IQEHIkUfLOIGWbx9DEDAWjUOmWpeYlYb00j5RmN6UT"
    );
    return useMutation({
        mutationFn: (address_id: CheckoutInput) => verify(address_id),
        onSuccess: async (data) => {
            if (data?.data?.app_data?.StatusCode === 6000) {
                const stripe = await stripePromise;
                const sessionId = data?.data?.app_data?.data?.strape.id;

                const { error } = await stripe.redirectToCheckout({
                    sessionId,
                });

                // Cookies.remove("purchaseId");
                console.log(
                    data?.data?.app_data?.data?.strape.id,
                    "______stra"
                );

                Cookies.set(
                    "purchaseId",
                    data?.data?.app_data?.data?.strape.id
                );
                authorize();
                closeModal();
            }
        },
        onError: (data) => {
            console.log(data, "login error response");
        },
    });
};
