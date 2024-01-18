import Cart from "@components/cart/cart";
import { useUI } from "@contexts/ui.context";
import { Drawer } from "@components/common/drawer/drawer";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";
import Wishlist from "@components/wishlist/wishlist";

const ManagedDrawer = () => {
    const { displayCart, closeCart, displayWishlist, closeWishlist } = useUI();
    const { locale } = useRouter();
    const dir = getDirection(locale);
    const contentWrapperCSS = dir === "ltr" ? { right: 0 } : { left: 0 };
    return (
        <>
            {displayCart ? (
                <Drawer
                    open={displayCart}
                    placement={dir === "rtl" ? "left" : "right"}
                    onClose={closeCart}
                    contentWrapperStyle={contentWrapperCSS}
                    {...motionProps}
                >
                    <Cart />
                </Drawer>
            ) : displayWishlist ? (
                <Drawer
                    open={displayWishlist}
                    placement={dir === "rtl" ? "left" : "right"}
                    onClose={closeWishlist}
                    contentWrapperStyle={contentWrapperCSS}
                    {...motionProps}
                >
                    <Wishlist />
                </Drawer>
            ) : null}
        </>
    );
};

export default ManagedDrawer;
