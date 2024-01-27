import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";
import { useFetchCartItemsQuery } from "@framework/cart/get-cart-items";
import CartItem from "@components/cart/cart-item";
import { useEffect, useState } from "react";
import { useEditCartMutation } from "@framework/cart/edit-cart";

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
        return items?.reduce(
            (total, item) => total + item?.price * item?.quantity,
            0
        );
    };

    const [cartTotal, setCartTotal] = useState(calculateTotalPrice());

    useEffect(() => {
        setCartTotal(calculateTotalPrice());
    }, [items]);

    const checkoutFooter = [
        {
            id: 1,
            name: "Subtotal",
            price: `$${cartTotal}`,
        },
        {
            id: 2,
            name: "Shipping",
            price: "Free",
        },
        {
            id: 3,
            name: "Total",
            price: `$${cartTotal}`,
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

            {checkoutFooter.map((item: any) => (
                <CheckoutCardFooterItem item={item} key={item.id} />
            ))}
        </div>
    );
};

export default CheckoutCard;
