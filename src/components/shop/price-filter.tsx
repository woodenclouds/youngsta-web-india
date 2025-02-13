import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import { countryData } from "@utils/currencies";
import RangeSelector from "@components/general/RangeSelector";
const priceFilterItems = [
  {
    id: "1",
    name: `Under ${countryData?.symbol}50`,
    slug: "0-50",
  },
  {
    id: "2",
    name: `${countryData?.symbol}50 to ${countryData?.symbol}100`,
    slug: "50-100",
  },
  {
    id: "3",
    name: `${countryData?.symbol}100 to ${countryData?.symbol}150`,
    slug: "100-150",
  },
  {
    id: "4",
    name: `${countryData?.symbol}150 to ${countryData?.symbol}200`,
    slug: "150-200",
  },
  {
    id: "5",
    name: `${countryData?.symbol}200 to ${countryData?.symbol}300`,
    slug: "200-300",
  },
  {
    id: "6",
    name: `${countryData?.symbol}300 to ${countryData?.symbol}500`,
    slug: "300-500",
  },
  {
    id: "7",
    name: `${countryData?.symbol}500 to ${countryData?.symbol}1000`,
    slug: "500-1000",
  },
  {
    id: "8",
    name: `Over ${countryData?.symbol}1000`,
    slug: "1000-",
  },
];
export const PriceFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;

  const selectedPrice = query?.price as string;

  function handlePriceItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;

    const { price, ...restQuery } = query;
    // const { ...restQuery } = query;
    // const priceValue = [...price?.split(","), value].join(",");
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(value ? { price: value } : {}), // Only one price can be selected
          //   ...(value ? { price: value } : {}), // Only one price can be selected
        },
      },
      undefined,
      { scroll: false }
    );
  }

  const handlePriceChange = (e)=>{
    const { price, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(e.target.value ? { price: e.target.value } : {}), // Only one price can be selected
          //   ...(value ? { price: value } : {}), // Only one price can be selected
        },
      },
      undefined,
      { scroll: false }
    );
  }

  const items = priceFilterItems;

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {t("text-price")}
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        <RangeSelector onChange={handlePriceChange} value={query?.price} />
        {/* {items?.map((item: any) => (
          <CheckBox
            key={item.id}
            label={item.name}
            name={item?.name?.toLowerCase()}
            checked={selectedPrice === item.slug}
            value={item.slug}
            onChange={handlePriceItemClick}
          />
        ))} */}
      </div>
    </div>
  );
};
