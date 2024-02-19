import React, { useRef } from "react";
import SearchIcon from "@components/icons/search-icon";
import Image from "next/image";
import like from "../../../../public/icons/whish-icon.svg";
import HeaderMenu from "@components/layout/header/header-menu";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import UserIcon from "@components/icons/user-icon";
import { useHeaderMenuQuery } from "@framework/category/get-header-menu";
const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
    ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const Header: React.FC = () => {
    const { openSearch, openModal, setModalView, isAuthorized, openWishlist } =
        useUI();

    const siteHeaderRef = useRef() as DivElementRef;
    addActiveScroll(siteHeaderRef);

    function handleLogin() {
        setModalView("LOGIN_VIEW");
        return openModal();
    }

    const { data } = useHeaderMenuQuery({});

    return (
        <header
            id="siteHeader"
            ref={siteHeaderRef}
            className="relative z-20 w-full h-16 sm:h-20 lg:h-24"
        >
            <div className="fixed z-20 w-full h-16 px-4 text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font sm:h-20 lg:h-24 md:px-8 lg:px-6">
                <div className="flex items-center  mx-auto max-w-[1920px] h-full w-full justify-between">
                    <div>
                        <Logo />
                    </div>
                    <div className=" items-center cursor-pointer  hidden max-lg:flex ">
                        <div
                            className="mr-5 cursor-pointer"
                            onClick={openWishlist}
                        >
                            <Image
                                src={like}
                                alt="whishIcon"
                                width={25}
                                height={25}
                            />
                        </div>
                    </div>

                    <HeaderMenu
                        data={data?.length > 0 ? data : []}
                        className="hidden lg:flex ltr:md:ml-6 rtl:md:mr-6 ltr:xl:ml-10 rtl:xl:mr-10"
                    />

                    <div className="items-center justify-end flex-shrink-0 hidden lg:flex gap-x-6 lg:gap-x-5 xl:gap-x-8 2xl:gap-x-10 ltr:ml-auto rtl:mr-auto">
                        <button
                            className="relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none"
                            onClick={openSearch}
                            aria-label="search-button"
                        >
                            <SearchIcon />
                        </button>

                        <CartButton
                            isAuthorized={isAuthorized}
                            handleLogin={handleLogin}
                        />
                        <div
                            className="flex items-center cursor-pointer .d-lg-none "
                            onClick={isAuthorized ? openWishlist : handleLogin}
                        >
                            <Image
                                src={like}
                                alt="whishIcon"
                                width={25}
                                height={25}
                            />
                        </div>

                        <div className="flex content-end flex-shrink-0">
                            <AuthMenu
                                isAuthorized={isAuthorized}
                                href={ROUTES.ACCOUNT}
                                className="text-sm font-semibold xl:text-base text-heading"
                                btnProps={{
                                    className:
                                        "text-sm xl:text-base text-heading font-semibold focus:outline-none",
                                    // @ts-ignore
                                    children: <UserIcon />,
                                    onClick: handleLogin,
                                }}
                            >
                                <UserIcon />
                            </AuthMenu>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
