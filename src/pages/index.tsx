import BannerCard from "@components/common/banner-card";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import BannerWithProducts from "@containers/banner-with-products";
import Divider from "@components/ui/divider";
import ProductsFlashSaleBlock from "@containers/product-flash-sale-block";
import ProductsFeatured from "@containers/products-featured";
import BannerSliderBlock from "@containers/banner-slider-block";
import ExclusiveBlock from "@containers/exclusive-block";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import { homeThreeBanner as banner } from "@framework/static/banner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { GetStaticProps } from "next";

export default function Home() {
  return (
    <>
      <ExclusiveBlock className="mb-12 md:mb-14 xl:mb-16 px-2.5 mx-auto max-w-[1920px]" />

      <Container>
        <ProductsFlashSaleBlock date={"2024-03-01T01:02:03"} />
        <BannerCard
          key={`banner--key${banner[0].id}`}
          banner={banner[0]}
          section={1}
          href={`/category/${banner[0].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        />
        <ProductsFeatured
          sectionHeading="text-featured-products"
          variant="center"
        />
      </Container>

      <BannerSliderBlock />
      <Container>
        <BannerWithProducts
          sectionHeading="text-on-selling-products"
          categorySlug="/search"
        />
        <BannerCard
          key={`banner--key${banner[1].id}`}
          banner={banner[1]}
          href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        />

        <NewArrivalsProductFeed />
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

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
