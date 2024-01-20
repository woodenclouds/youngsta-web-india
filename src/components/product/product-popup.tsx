import React, { useState } from "react";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { ProductAttributes } from "@components/product/product-attributes";
import { getVariations } from "@framework/utils/get-variations";
import { useTranslation } from "next-i18next";
import { useAddToCartMutation } from "@framework/cart/add-to-cart";

export default function ProductPopup() {
    const { t } = useTranslation("common");
    const {
        modalData: { data },
        closeModal,
        openCart,
    } = useUI();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [attribute_id, setSize] = useState("");
    const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
    const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);

    const variations = getVariations(data.variations);
    const {
        id,
        slug,
        attribute,
        name,
        description,
        price,
        purchase_price,
        thumbnail,
    } = data;
    const { mutate: addToCart, isPending } = useAddToCartMutation();

    console.log("slug", data);

    const isSelected = !isEmpty(variations)
        ? !isEmpty(attributes) &&
          Object.keys(variations).every((variation) =>
              attributes.hasOwnProperty(variation)
          )
        : true;

    function addItemToTheCart() {
        addToCart({ attribute_id, quantity, id });
        setViewCartBtn(true);
    }

    function navigateToProductPage() {
        closeModal();
        router.push(`${ROUTES.PRODUCT}/${slug}`, undefined, {
            locale: router.locale,
        });
    }

    function navigateToCartPage() {
        closeModal();
        setTimeout(() => {
            openCart();
        }, 300);
    }

    return (
        <div className="rounded-lg bg-white">
            <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
                <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
                    <img
                        src={thumbnail}
                        alt={name}
                        className="lg:object-cover lg:w-full lg:h-full"
                    />
                </div>

                <div className="flex flex-col p-5 md:p-8 w-full">
                    <div className="pb-5">
                        <div
                            className="mb-2 md:mb-2.5 block -mt-1.5"
                            onClick={navigateToProductPage}
                            role="button"
                        >
                            <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
                                {name}
                            </h2>
                        </div>
                        <p className="text-sm leading-6 md:text-body md:leading-7">
                            {description}
                        </p>

                        <div className="flex items-center mt-3">
                            <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                                {purchase_price}
                            </div>
                            {price && (
                                <del className="font-segoe text-gray-400 text-base lg:text-xl ltr:pl-2.5 rtl:pr-2.5 -mt-0.5 md:mt-0">
                                    {price}
                                </del>
                            )}
                        </div>
                    </div>

                    <ProductAttributes
                        key={`popup-attribute-key${attribute}`}
                        title={"Size"}
                        attributes={attribute}
                        size={attribute_id}
                        setSize={setSize}
                    />

                    <div className="pt-2 md:pt-4">
                        <div className="flex items-center justify-between mb-4 gap-x-3 sm:gap-x-4">
                            <Counter
                                quantity={quantity}
                                onIncrement={() =>
                                    setQuantity((prev) => prev + 1)
                                }
                                onDecrement={() =>
                                    setQuantity((prev) =>
                                        prev !== 1 ? prev - 1 : 1
                                    )
                                }
                                disableDecrement={quantity === 1}
                            />
                            <Button
                                onClick={addItemToTheCart}
                                variant="flat"
                                className={`w-full h-11 md:h-12 px-1.5 ${
                                    !isSelected &&
                                    "bg-gray-400 hover:bg-gray-400"
                                }`}
                                disabled={!isSelected}
                                loading={isPending}
                            >
                                {t("text-add-to-cart")}
                            </Button>
                        </div>

                        {viewCartBtn && !isPending && (
                            <button
                                onClick={navigateToCartPage}
                                className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
                            >
                                {t("text-view-cart")}
                            </button>
                        )}

                        <Button
                            onClick={navigateToProductPage}
                            variant="flat"
                            className="w-full h-11 md:h-12"
                        >
                            {t("text-view-details")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
