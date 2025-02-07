import React, { useState } from "react";
import CheckoutForm from "./checkout-form";
import CheckoutCard from "./checkout-card";

const CheckoutContainer: React.FC = () => {
  const [coupon_code, set_coupon_code] = useState<string | null>(null);
  const [accessWalletAmount,setAccessWalletAmount] = useState<boolean>(false);
  return (
    <>
      <div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
        <CheckoutForm coupon_code={coupon_code} accessWalletAmount={accessWalletAmount} />
      </div>
      <div className="md:w-full lg:w-2/5 ltr:md:ml-7 rtl:md:mr-7 ltr:lg:ml-10 rtl:lg:mr-10 ltr:xl:ml-14 rtl:xl:mr-14 flex flex-col h-full -mt-1.5">
        <CheckoutCard set_coupon_code={set_coupon_code} setAccessWalletAmount={setAccessWalletAmount} accessWalletAmount={accessWalletAmount} />
      </div>
    </>
  );
};

export default CheckoutContainer;
