import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";
import { useFetchCartItemsQuery } from "@framework/cart/get-cart-items";
import CartItem from "@components/cart/cart-item";
import { useEffect, useState } from "react";
import { useEditCartMutation } from "@framework/cart/edit-cart";
import { countryData } from "@utils/currencies";
import { useAddReferralMutation } from "@framework/cart/add-refferal-code";
import { toast } from "react-toastify";
import { useAddCoupenMutation } from "@framework/cart/add-coupen-code";

const CheckoutCard: React.FC = () => {
  const { t } = useTranslation("common");

  const { mutate: editCart } = useEditCartMutation();
  function editCartItems(item: any, quantity: number) {
    let attribute_id = item?.attribute_id;
    let id = item?.id;
    editCart({ attribute_id, quantity, id });
  }
  const { data: items } = useFetchCartItemsQuery({
    limit: 10,
  });

  const calculateTotalPrice = () => {
    console.log("calculateTotalPrice", items);
    return items?.reduce(
      (total, item: any) =>
        total + item?.product_info?.selling_price * item?.quantity,
      0
    );
  };

  const [cartTotal, setCartTotal] = useState(0);
  const [isCoupen, setCoupen] = useState(true);
  const [isRefferal, setRefferal] = useState(true);
  const [refferalCode, setRefferalCode] = useState("");
  const [coupenCode, setCoupenCode] = useState("");
  useEffect(() => {
    if (items?.length) setCartTotal(calculateTotalPrice());
  }, [items]);
  const onSuccess = () => {
    toast.success("Referral added successfully!");
  };

  const onError = (error: any) => {
    toast.error(`Failed to add referral: ${error}`);
  };

  const { mutate } = useAddReferralMutation(onSuccess, onError);
  const { mutate: coupenMutation } = useAddCoupenMutation(onSuccess, onError);
  const handleAddReferral = () => {
    mutate({ referral_code: refferalCode });
  };
  const handleCoupen = () => {
    coupenMutation({ coupen_code: coupenCode });
  }

  const checkoutFooter = [
    {
      id: 1,
      name: "Subtotal",
      price: `${countryData?.symbol}${cartTotal}`,
    },
    {
      id: 2,
      name: "Shipping",
      price: "Free",
    },
    {
      id: 3,
      name: "Total",
      price: `${countryData?.symbol}${cartTotal}`,
    },
  ];

  return (
    <div className="pt-12 md:pt-0 ltr:2xl:pl-4 rtl:2xl:pr-4">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-your-order")}
      </h2>
      <div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
        <span>{t("text-product")}</span>
        <span className="ltr:ml-auto rtl:mr-auto flex-shrink-0">
          {t("text-sub-total")}
        </span>
      </div>

      {items?.map((item) => (
        <CartItem
          item={item}
          key={item.id}
          editCartItems={editCartItems}
          isCheckout={true}
        />
      ))}
      <div className="gap-2">
        <input
          type="checkbox"
          checked={isRefferal}
          onChange={() => setRefferal(!isRefferal)}
          name="coupon"
        />
        <label htmlFor="coupon" className="ml-2">
          I have a refferal
        </label>
        {isRefferal && (
          <div className="flex gap-2 py-3">
            <input
              type="text"
              placeholder="Refferal code"
              className="w-3/4 py-2 px-2 border border-gray-400 rounded"
              onChange={(e) => setRefferalCode(e.target.value)}
            />
            <button
              className="w-1/4 bg-black rounded text-white"
              onClick={handleAddReferral}
            >
              Apply
            </button>
          </div>
        )}
      </div>
      <div className="gap-2">
        <input
          type="checkbox"
          checked={isCoupen}
          onChange={() => setCoupen(!isCoupen)}
          name="coupon"
        />
        <label htmlFor="coupon" className="ml-2">
          I have a coupon
        </label>
        {isCoupen && (
          <div className="flex gap-2 py-3">
            <input
              type="text"
              placeholder="Coupon code"
              className="w-3/4 py-2 px-2 border border-gray-400 rounded"
              onChange={(e)=>setCoupenCode(e.target.value)}
            />
            <button className="w-1/4 bg-black rounded text-white" onClick={handleCoupen}>Check</button>
          </div>
        )}
      </div>
      {checkoutFooter.map((item: any) => (
        <CheckoutCardFooterItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default CheckoutCard;
