import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { category } from "@framework/static/ancient/category";
interface ProductGridProps {
  className?: string;
  params?: any;
}
export const ProductGrid: FC<ProductGridProps> = ({ className, params }) => {
  const { query } = useRouter();
  console.log(params,query.category, "____query");

  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({
    limit: 10,
    // ...query,
    search: query?.slug
      ? query?.slug
      : query?.category
      ? query?.category
      : params
      ? params?.slug
      : null,
    category: params?.slug ? params?.slug : query?.category ? query?.category : query?.slug ? query?.slug : '',
  });

  if (error) return <p>{error.message}</p>;

  const { t } = useTranslation("common");
  console.log(params, query);
  
  return (
    <>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
        {isLoading && !data?.data?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          data?.data?.map((product) => {
            return (
              <ProductCard
                key={`product--key${product.id}`}
                product={product}
                variant="grid"
              />
            );
          })
        )}
      </div>
      <div className="text-center pt-8 xl:pt-14">
        {hasNextPage && (
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
            variant="slim"
          >
            {t("button-load-more")}
          </Button>
        )}
      </div>
    </>
  );
};
