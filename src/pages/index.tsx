import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import BannerWithProducts from "@containers/banner-with-products";
import Divider from "@components/ui/divider";
import ExclusiveBlock from "@containers/exclusive-block";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useGetBanners } from "@framework/product/get-banner";
import ProductsFlashSaleCarousel from "@containers/product-flash-sale-carousel";
import HeroGridCarousel from "@containers/hero-grid-carousel";
import HeroBlock from "@containers/hero-block";

export default function Home() {
  const { data: section1Data } = useGetBanners({}, 1);
  const { data: section2Data } = useGetBanners({}, 3);
  const section1 = section1Data?.data ? section1Data?.data[0] : {};
  const section2 = section2Data?.data ? section2Data?.data[0] : {};

  return (
    <>
    <HeroBlock />
      {/* <ExclusiveBlock className="mb-12 md:mb-14 xl:mb-16 px-2.5 mx-auto max-w-[1920px]" /> */}

      <Container>
        <ProductsFlashSaleCarousel date={"2024-03-01T01:02:03"} />
      </Container>
      <Container>
        <BannerWithProducts
          sectionHeading="text-on-selling-products"
          categorySlug="/search"
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
