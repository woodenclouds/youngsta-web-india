import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import OrdersTable from "@components/my-account/orders-table";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useWindowSize } from "react-use";

export default function OrdersTablePage() {
    const router = useRouter();
    const { query } = router;
    const action = query?.action;

    const { width } = useSsrCompatible(useWindowSize(), {
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (action === "payment_success") {
            toast.success("Payment completed successfully", {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-right" : "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => {
                router.push("/my-account/orders");
            }, 2000);
        } else if (action === "payment_failed") {
            toast.error("Payment failed", {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-right" : "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => {
                // router.push("/my-account/orders");
            }, 2000);
        }
    }, [action]);
    return (
        <AccountLayout>
            <OrdersTable />
        </AccountLayout>
    );
}

OrdersTablePage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                "common",
                "forms",
                "menu",
                "footer",
            ])),
        },
    };
};
