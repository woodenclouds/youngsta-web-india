// components/AuthCheck.js
import React, { useEffect, useContext } from "react";
import { getToken } from "@framework/utils/get-token";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router"; // Import useRouter

const AuthCheck = ({ children }) => {
    const { openSearch, openModal, setModalView, isAuthorized, openWishlist } =
        useUI();
    const token = getToken();
    const router = useRouter();

    function handleLogin() {
        setModalView("LOGIN_VIEW");
        // router.push("/");
        return openModal();
    }

    // useEffect(() => {
    //     if (!token && router?.pathname !== "/") {
    //         handleLogin();
    //     }
    // }, [token, router?.pathname]);

    return <>{children}</>;
};

export default AuthCheck;
