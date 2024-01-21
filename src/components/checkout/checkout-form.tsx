import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
// import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import { fetchAddresses, useAddresses } from "@framework/cart/view-address";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useCheckoutMutation } from "@framework/auth/use-checkout";
import { useState } from "react";

interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
}

const CheckoutForm: React.FC = () => {
  const { t } = useTranslation();
  // const { mutate: updateUser, isPending } = useCheckoutMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>();
  function onSubmit(input: CheckoutInputType) {
    updateUser(input);
    Router.push(ROUTES.ORDER);
  }
  const {
    data: addresses,
    isLoading,
    isError,
  } = useAddresses({
    limit: 10,
  });
  console.log(addresses, "_______");
  const [addressId, setAddressId] = useState<string | undefined>(undefined);
  
  const { mutate: checkout } = useCheckoutMutation();
console.log(addressId,'_________address___id');

  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-shipping-address")}
      </h2>
      <div className="flex gap-3 mb-4">
        {addresses?.map((address, index) => (
          <div
            key={index}
            className="p-3 w-1/4 rounded-lg shadow-md ring-2 ring-offset-3 ring-gray-500"
          >
            <input
              type="radio"
              name="address"
              id={`address${index}`}
              onChange={() => setAddressId(address.id)}
            />
            <h4>
              {address.first_name} {address.last_name}
            </h4>
            <h4>{address.address}</h4>
            <h4>{address.city}</h4>
            <h4>{address.post_code}</h4>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="First Name"
              {...register("firstName", {
                required: "forms:first-name-required",
              })}
              errorKey={errors.firstName?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <Input
              labelKey="Last Name"
              {...register("lastName", {
                required: "Last Name",
              })}
              errorKey={errors.lastName?.message}
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
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="City"
              {...register("city")}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              labelKey="Postcode"
              {...register("zipCode")}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
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
              // loading={isPending}
              // disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                checkout({"input":addressId})
              }}
            >
              {t("common:button-place-order")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
