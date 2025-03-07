import CartIcon from "@components/icons/cart-icon";
import { useUI } from "@contexts/ui.context";
import { useFetchCartItemsQuery } from "@framework/cart/get-cart-items";

export default function CartButton({
    isAuthorized,
    handleLogin,
}: {
    isAuthorized: boolean;
    handleLogin: () => void;
}) {
    const { openCart, is_cart_updated } = useUI();
    const { data } = useFetchCartItemsQuery({
        limit: 10,
        is_cart_updated,
    });
    function handleCartOpen() {
        return openCart();
    }

    return (
        <button
            className="relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none"
            onClick={isAuthorized ? handleCartOpen : handleLogin}
            aria-label="cart-button"
        >
            <CartIcon />
            <span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 rounded-full ltr:-right-2.5 ltr:xl:-right-3 rtl:-left-2.5 rtl:xl:-left-3 font-bold">
                {Array.isArray(data) && data?.length > 10
                    ? "10+"
                    : Array.isArray(data) && data?.length && data?.length < 10
                    ? data?.length
                    : "0"}
            </span>
        </button>
    );
}
