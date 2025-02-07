import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useAddAddressMutation } from "@framework/checkout/use-add-address";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import { useAddresses } from "@framework/cart/view-address";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Script from "next/script";
import { usePlaceOrderMutation } from "@framework/checkout/place-order";
import { toast } from "react-toastify";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useWindowSize } from "react-use";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useDeleteAddressMutation } from "@framework/checkout/use-delete-address";
import { useEditAddressMutation } from "@framework/checkout/use-edit-address";

interface AddAddressInputType {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  post_code: string;
  save: boolean;
  note: string;
  state: string;
}

const CheckoutForm: React.FC = ({
  coupon_code,
}: {
  coupon_code: string|null
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const email = Cookies.get("email");
  const [selectedAddress, setSelectedAddress] = useState({ id: null });

  const { width } = useSsrCompatible(useWindowSize(), {
    width: 0,
    height: 0,
  });

  const handleAddAddressSuccess = () => {
    toast.success("Address updated successfully", {
      progressClassName: "fancy-progress-bar",
      position: width > 768 ? "bottom-right" : "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setUpdated(!isUpdated);
    reset({
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      email: email,
      city: "",
      state: "",
      post_code: "",
      note: "",
    });
    setAddAddress(false);
  };

  const handlDeleteAddressSuccess = () => {
    toast.success("Address deleted successfully", {
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
    setAddAddress(false);
  };

  const handlDeleteAddressError = (data: any) => {
    toast.error(data?.message, {
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
    setAddAddress(false);
  };

  const handlOrderError = (data: any) => {
    toast.error(data?.title, {
      progressClassName: "fancy-progress-bar",
      position: width > 768 ? "bottom-right" : "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const paymentFunction = (response: any) => {
    console.log(response);

    // window.open(response?.payment_url,"_blank");
    router.push(response?.payment_url);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddAddressInputType>({
    defaultValues: {
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      email: email,
      city: "",
      state: "",
      post_code: "",
      note: "",
    },
  });

  const { mutate: addAddress, isPending } = useAddAddressMutation(
    handleAddAddressSuccess
  );

  const { mutate: editAddress, isPending: isEdit } = useEditAddressMutation(
    handleAddAddressSuccess,
    handlDeleteAddressError
  );

  const { mutate: deleteAddress } = useDeleteAddressMutation(
    handlDeleteAddressSuccess,
    handlDeleteAddressError
  );

  const { mutate: placeOrder, isPending: isOrderPending } =
    usePlaceOrderMutation(paymentFunction, handlOrderError);

  const [addressId, setAddressId] = useState<string | undefined>(undefined);

  function onSubmit(input: any) {
    if (selectedAddress?.id) {
      editAddress({
        ...input,
        id: selectedAddress?.id,
      });
    } else {
      addAddress(input);
    }
  }

  function onDelete(id: any) {
    deleteAddress(id);
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

  useEffect(() => {
    if (Array.isArray(addresses) && addresses?.length <= 0) {
      setAddAddress(true);
    }
  }, [Array.isArray(addresses) && addresses?.length]);

  const makePayment = async (id: string) => {
    placeOrder({ address: id ,coupon_code:coupon_code});
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
          className={`w-full sm:w-auto bg-transparent hover:bg-transparent !text-[#212121] !shadow-none ${
            Array.isArray(addresses) && addresses?.length <= 0
              ? "!cursor-not-allowed"
              : "cursor-pointer"
          }	`}
          loading={isPending}
          onClick={(e) => {
            setSelectedAddress({ id: null });
            reset({
              first_name: "",
              last_name: "",
              address: "",
              phone: "",
              email: email,
              city: "",
              state: "",
              post_code: "",
              note: "",
            });
            if (Array.isArray(addresses) && addresses?.length <= 0) {
              e.preventDefault();
            } else {
              setAddAddress(!isAddAddress);
            }
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
                value={email}
                labelKey="Email"
                {...register("email", {
                  required: "forms:email-required",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                {...register("post_code")}
                variant="solid"
                className="w-full lg:w-1/2"
              />
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
                loading={isPending || isEdit}
                disabled={isPending}
              >
                {selectedAddress?.id ? "Update Address" : "Add Address"}
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
                  className="cursor-pointer p-3 w-[100%] rounded-lg shadow-md ring-2 ring-offset-3 ring-gray-500"
                  onClick={() => setAddressId(address?.id)}
                >
                  <div className="flex w-full justify-between mb-[10px]">
                    <input
                      type="radio"
                      name="address"
                      id={`address${index}`}
                      checked={addressId === address?.id}
                      onChange={() => setAddressId(address?.id)}
                    />
                    <div>
                      <span
                        className="text-[16px] mr-[10px] py-[5px] px-[10px] rounded hover:opacity-60 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent  !text-[#212121] bg-[#fff]	"
                        onClick={() => {
                          setSelectedAddress(address);
                          setAddAddress(true);
                          reset({
                            first_name: address?.first_name,
                            last_name: address?.last_name,
                            address: address?.address,
                            phone: address?.phone,
                            email: email,
                            city: address?.city,
                            state: address?.state,
                            post_code: address?.post_code,
                            note: address?.note,
                          });
                        }}
                      >
                        Edit
                      </span>
                      <span
                        className="text-[16px] py-[5px] px-[10px] rounded hover:opacity-60 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent  !text-[#212121] bg-[#fff]	"
                        onClick={(e) => {
                            e.stopPropagation()
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              onDelete(address?.id);
                            }
                          });
                        }}
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <h4>
                      {address.first_name} {address.last_name}
                    </h4>
                  </div>

                  <h4>{address?.phone}</h4>
                  <h4>{address?.email}</h4>
                  <h4>
                    {address?.address} {address?.city} {address?.state}
                  </h4>
                  <h4>{address?.post_code}</h4>
                </div>
              ))}
          </div>
          <div className="block !w-full">
            <Button
              className="!w-full sm:w-auto block"
              loading={isOrderPending}
              disabled={isOrderPending}
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
