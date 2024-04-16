import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import { ProductGrid } from "@components/product/product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBanner from "@containers/category-banner";
import { GetServerSideProps } from "next";

export default function Category({ slug }: any) {
    return (
        <div className="border-t-2 border-borderBottom">
            <Container>
                <CategoryBanner />
                <div className="pb-16 lg:pb-20">
                    <ProductGrid
                        className="3xl:grid-cols-6"
                        param={`category=${slug}`}
                    />
                </div>
            </Container>
        </div>
    );
}

Category.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
    locale,
    query,
}) => {
    const { slug } = query; // Extracting the slug from the query

    return {
        props: {
            slug,
            ...(await serverSideTranslations(locale!, [
                "common",
                "forms",
                "menu",
                "footer",
            ])),
        },
    };
};
