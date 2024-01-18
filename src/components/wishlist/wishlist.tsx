import Scrollbar from "@components/common/scrollbar";
import { useCart } from "@contexts/cart/cart.context";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";
import { IoClose } from "react-icons/io5";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import CartItem from "@components/cart/cart-item";
import { useFetchWishlistItemsQuery } from "@framework/wishlist/get-wishlist-items";
import EmptyCart from "@components/cart/empty-cart";

export default function Wishlist() {
    const { t } = useTranslation("common");
    const { closeCart } = useUI();
    const { items, total, isEmpty } = useCart();
    const { price: cartTotal } = usePrice({
        amount: total,
        currencyCode: "USD",
    });

    const { data } = useFetchWishlistItemsQuery({
        limit: 10,
    });

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <div className="w-full flex justify-between items-center relative ltr:pl-5 ltr:md:pl-7 rtl:pr-5 rtl:md:pr-7 py-0.5 border-b border-gray-100">
                <h2 className="m-0 text-xl font-bold md:text-2xl text-heading">
                    Wishlist
                </h2>
                <button
                    className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60"
                    onClick={closeCart}
                    aria-label="close"
                >
                    <IoClose className="text-black mt-1 md:mt-0.5" />
                </button>
            </div>
            {!isEmpty ? (
                <Scrollbar className="flex-grow w-full cart-scrollbar">
                    <div className="w-full px-5 md:px-7">
                        {items?.map((item) => (
                            <CartItem item={item} key={item.id} />
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
                        Your wishlist is empty
                    </h3>
                </motion.div>
            )}
        </div>
    );
}
