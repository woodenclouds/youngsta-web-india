import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useAddAddressMutation } from "@framework/checkout/use-add-address";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import { useAddresses } from "@framework/cart/view-address";
import { useTranslation } from "next-i18next";
import { useCheckoutMutation } from "@framework/auth/use-checkout";
import { useEffect, useState } from "react";
import Script from "next/script";
import { getToken } from "@framework/utils/get-token";
import { usePlaceOrderMutation } from "@framework/checkout/place-order";
import { toast } from "react-toastify";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useWindowSize } from "react-use";
import { useOrderSuccessMutation } from "@framework/checkout/order-success";

interface AddAddressInputType {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    save: boolean;
    note: string;
    state: string;
}

const CheckoutForm: React.FC = () => {
    const { t } = useTranslation();

    const { width } = useSsrCompatible(useWindowSize(), {
        width: 0,
        height: 0,
    });

    const handleAddAddressSuccess = () => {
        toast("Address added successfully", {
            progressClassName: "fancy-progress-bar",
            position: width > 768 ? "bottom-right" : "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        setUpdated(!isUpdated);
        reset();
    };

    const razorPayFunction = (response: any) => {
        const options = {
            currency: "INR",
            amount: response.razorpay.amount,
            order_id: response.razorpay.order_id,
            handler: function (response: any) {
                orderSuccess(response?.purchase);
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response: any) {
            alert("Payment failed. Please try again. Contact support for help");
        });
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddAddressInputType>();

    const { mutate: addAddress, isPending } = useAddAddressMutation(
        handleAddAddressSuccess
    );
    const { mutate: placeOrder } = usePlaceOrderMutation(razorPayFunction);
    const { mutate: orderSuccess } = useOrderSuccessMutation();

    const [addressId, setAddressId] = useState<string | undefined>(undefined);

    function onSubmit(input: AddAddressInputType) {
        addAddress(input);
    }
    const [isUpdated, setUpdated] = useState(false);
    const [isAddAddress, setAddAddress] = useState(false);

    const { data: addresses } = useAddresses({
        limit: isUpdated,
    });

    useEffect(() => {
        if (Array.isArray(addresses)) {
            if (addresses?.[0]?.id) {
                setAddressId(addresses?.[0]?.id);
            }
        }
    }, [Array.isArray(addresses) && addresses?.[0]?.id]);

    const makePayment = async (id: string) => {
        placeOrder({ address: id });
    };

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className="mb-6 xl:mb-8 flex justify-between items-center">
                <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading ">
                    {t("text-shipping-address")}
                </h2>
                <Button
                    className="w-full sm:w-auto bg-transparent hover:bg-transparent !text-[#212121] !shadow-none	"
                    loading={isPending}
                    onClick={(e) => {
                        setAddAddress(!isAddAddress);
                    }}
                    style={{
                        boxShadow: "none",
                    }}
                >
                    {isAddAddress ? "Cancel" : "Add Address"}
                </Button>
            </div>

            {isAddAddress ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full mx-auto flex flex-col justify-center "
                    noValidate
                >
                    <div className="flex flex-col space-y-4 lg:space-y-5">
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                            <Input
                                labelKey="First Name"
                                {...register("first_name", {
                                    required: "forms:first-name-required",
                                })}
                                errorKey={errors.first_name?.message}
                                variant="solid"
                                className="w-full lg:w-1/2 "
                            />
                            <Input
                                labelKey="Last Name"
                                {...register("last_name", {
                                    required: "Last Name",
                                })}
                                errorKey={errors.last_name?.message}
                                variant="solid"
                                className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
                            />
                        </div>
                        <Input
                            labelKey="Address"
                            {...register("address", {
                                required: "forms:address-required",
                            })}
                            errorKey={errors.address?.message}
                            variant="solid"
                        />
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                            <Input
                                type="tel"
                                labelKey="Phone"
                                {...register("phone", {
                                    required: "forms:phone-required",
                                })}
                                errorKey={errors.phone?.message}
                                variant="solid"
                                className="w-full lg:w-1/2 "
                            />

                            <Input
                                type="email"
                                labelKey="Email"
                                {...register("email", {
                                    required: "forms:email-required",
                                    pattern: {
                                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "forms:email-error",
                                    },
                                })}
                                errorKey={errors.email?.message}
                                variant="solid"
                                className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
                            />
                        </div>
                        <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0">
                            <Input
                                labelKey="City"
                                {...register("city")}
                                variant="solid"
                                className="w-full lg:w-1/2 "
                            />

                            <Input
                                labelKey="State"
                                {...register("state")}
                                variant="solid"
                                className=" w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
                            />
                        </div>
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                            {" "}
                            <Input
                                labelKey="Postcode"
                                {...register("zipCode")}
                                variant="solid"
                                className="w-full lg:w-1/2"
                            />
                        </div>
                        <div className="relative flex items-center ">
                            <CheckBox labelKey="forms:label-save-information" />
                        </div>
                        <TextArea
                            labelKey="forms:label-order-notes"
                            {...register("note")}
                            placeholderKey="forms:placeholder-order-notes"
                            className="relative pt-3 xl:pt-6"
                        />
                        <div className="flex w-full">
                            <Button
                                className="w-full sm:w-auto"
                                loading={isPending}
                                disabled={isPending}
                            >
                                Add Address
                            </Button>
                        </div>
                    </div>
                </form>
            ) : (
                <div>
                    <div className="flex gap-3 mb-10 flex-wrap">
                        {Array.isArray(addresses) &&
                            addresses?.map((address: any, index: any) => (
                                <div
                                    key={index}
                                    className="cursor-pointer p-3 w-[48%] rounded-lg shadow-md ring-2 ring-offset-3 ring-gray-500"
                                    onClick={() => setAddressId(address?.id)}
                                >
                                    <div className="flex justify-between">
                                        <h4>
                                            {address.first_name}{" "}
                                            {address.last_name}
                                        </h4>
                                        <input
                                            type="radio"
                                            name="address"
                                            id={`address${index}`}
                                            checked={addressId === address?.id}
                                            onChange={() =>
                                                setAddressId(address?.id)
                                            }
                                        />
                                    </div>

                                    <h4>{address?.phone}</h4>
                                    <h4>{address?.email}</h4>
                                    <h4>
                                        {address?.address} {address?.city}{" "}
                                        {address?.state}
                                    </h4>
                                    <h4>{address?.post_code}</h4>
                                </div>
                            ))}
                    </div>
                    <div className="block !w-full">
                        <Button
                            className="!w-full sm:w-auto block"
                            loading={isPending}
                            disabled={isPending}
                            onClick={(e) => {
                                if (addressId) {
                                    makePayment(addressId);
                                }
                            }}
                        >
                            {t("common:button-place-order")}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckoutForm;
