import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import PageHeader from "@components/ui/page-header";
import CheckoutForm from "@components/checkout/checkout-form";
import CheckoutCard from "@components/checkout/checkout-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import CheckoutContainer from "@components/checkout/checkout-container";

export default function CheckoutPage() {
    return (
        <>
            <PageHeader pageHeader="text-page-checkout" />
            <Container>
                <div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
                    <CheckoutContainer />
                </div>
            </Container>
        </>
    );
}

CheckoutPage.Layout = Layout;

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
