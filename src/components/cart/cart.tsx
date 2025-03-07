import Scrollbar from "@components/common/scrollbar";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { useUI } from "@contexts/ui.context";
import { IoClose } from "react-icons/io5";
import CartItem from "./cart-item";
import EmptyCart from "./empty-cart";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { useFetchCartItemsQuery } from "@framework/cart/get-cart-items";
import { useEffect, useState } from "react";
import { useEditCartMutation } from "@framework/cart/edit-cart";
import { usedeleteCartMutation } from "@framework/cart/delet-from-cart";
import { countryData } from "@utils/currencies";

export default function Cart() {
    const { t } = useTranslation("common");
    const { closeCart, changeCart } = useUI();

    const { data } = useFetchCartItemsQuery({
        limit: 10,
    });

    useEffect(() => {
        if (data) {
            setCartItems(data);
        }
    }, [data]);

    const [cartItems, setCartItems] = useState(data);

    const { mutate: editCart } = useEditCartMutation();
    const { mutate: deleteFromCart } = usedeleteCartMutation(changeCart);

    function editCartItems(item: any, quantity: number) {
        let attribute_id = item?.attribute_id;
        let id = item?.id;
        editCart({ attribute_id, quantity, id });

        const updatedItems = cartItems?.map((cartItem) => {
            if (cartItem.id === item.id) {
                return { ...cartItem, quantity: quantity };
            }
            return cartItem;
        });

        setCartItems(updatedItems);
    }

    function deleteCartItems(id: any) {
        deleteFromCart({ id });

        const updatedItems = cartItems?.filter((item) => item.id !== id);
        setCartItems(updatedItems);
    }

    const calculateTotalPrice = () => {
        return cartItems?.reduce(
            (total, item: any) =>
                total + item?.product_info?.selling_price * item?.quantity,
            0
        );
    };

    const [cartTotal, setCartTotal] = useState(calculateTotalPrice());

    useEffect(() => {
        setCartTotal(calculateTotalPrice());
    }, [cartItems]);

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <div className="w-full flex justify-between items-center relative ltr:pl-5 ltr:md:pl-7 rtl:pr-5 rtl:md:pr-7 py-0.5 border-b border-gray-100">
                <h2 className="m-0 text-xl font-bold md:text-2xl text-heading">
                    {/* @ts-ignore */}
                    {t("text-shopping-cart")}
                </h2>
                <button
                    className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60"
                    onClick={closeCart}
                    aria-label="close"
                >
                    <IoClose className="text-black mt-1 md:mt-0.5" />
                </button>
            </div>
            {(cartItems?.length ?? 0) > 0 ? (
                <Scrollbar className="flex-grow w-full cart-scrollbar">
                    <div className="w-full px-5 md:px-7">
                        {cartItems?.map((item) => (
                            <CartItem
                                item={item}
                                key={item.id}
                                editCartItems={editCartItems}
                                deleteCartItems={deleteCartItems}
                            />
                        ))}
                    </div>
                </Scrollbar>
            ) : (
                <motion.div
                    layout
                    initial="from"
                    animate="to"
                    exit="from"
                    variants={fadeInOut(0.25)}
                    className="flex flex-col items-center justify-center px-5 pt-8 pb-5 md:px-7"
                >
                    <EmptyCart />
                    <h3 className="pt-8 text-lg font-bold text-heading">
                        {/* @ts-ignore */}
                        {t("text-empty-cart")}
                    </h3>
                </motion.div>
            )}

            <div
                className="flex flex-col px-5 pt-2 pb-5 md:px-7 md:pb-7"
                onClick={closeCart}
            >
                <Link
                    href={ROUTES.CHECKOUT}
                    className={cn(
                        "w-full px-5 py-3 md:py-4 flex items-center justify-center rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300 ",
                        (cartItems?.length ?? 0) < 1
                            ? "bg-blue-800 hover:bg-blue-500"
                            : "bg-heading hover:bg-gray-600"
                    )}
                >
                    <span className="w-full ltr:pr-5 rtl:pl-5 -mt-0.5 py-0.5">
                        {/* @ts-ignore */}
                        {t("text-proceed-to-checkout")}
                    </span>
                    <span className="rtl:mr-auto ltr:ml-auto flex-shrink-0 -mt-0.5 py-0.5 flex">
                        <span className="ltr:border-l rtl:border-r border-white ltr:pr-5 rtl:pl-5 py-0.5" />
                        {countryData.symbol}
                        {cartTotal}
                    </span>
                </Link>
            </div>
        </div>
    );
}
