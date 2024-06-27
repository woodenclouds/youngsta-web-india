import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import ProductSingleDetails from "@components/product/product-single-details";
import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
import Breadcrumb from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useProductQuery } from "@framework/product/get-product";
import { useRouter } from "next/router";
import Head from "next/head";

export default function ProductPage() {
  const {
    query: { slug, refferal_code },
  } = useRouter();
  const { data, isLoading } = useProductQuery(slug as string);

  const meta = {
    title: "",
    description: "",
    image: "",
  };

  if (data) {
    meta.title = `youngsta | ${data.name}`;
    meta.description = data.description ?? '';
    meta.image = data.thumbnail ?? '';
  }

  console.log(data, "_log_data_");

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Divider className="mb-0" />
      <Container>
        <div className="pt-8">
          <Breadcrumb />
        </div>
        <ProductSingleDetails />
        <RelatedProducts sectionHeading="text-related-products" />
      </Container>
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
