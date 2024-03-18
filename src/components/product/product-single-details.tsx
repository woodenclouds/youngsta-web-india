import React, { useEffect, useState } from "react";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useRouter } from "next/router";
import { useProductQuery } from "@framework/product/get-product";
import { ProductAttributes } from "./product-attributes";
import Link from "@components/ui/link";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import ProductMetaReview from "@components/product/product-meta-review";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useAddToCartMutation } from "@framework/cart/add-to-cart";
import { FaShareAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useUI } from "@contexts/ui.context";

const productGalleryCarouselResponsive = {
    "768": {
        slidesPerView: 2,
    },
    "0": {
        slidesPerView: 1,
    },
};

const ProductSingleDetails: React.FC = () => {
    const {
        query: { slug, refferal_code },
    } = useRouter();
    const { isAuthorized, setModalView, openModal } = useUI();

    useEffect(() => {
        const email = Cookies.get("email");
        if (refferal_code) {
            http.post(`${API_ENDPOINTS.CREATE_REFERAL}${slug}/`, {
                refferal_code: refferal_code,
                email: email,
            });
        }
    }, [refferal_code]);
    const { width } = useSsrCompatible(useWindowSize(), {
        width: 0,
        height: 0,
    });
    const { mutate: addToCart } = useAddToCartMutation();

    const { data, isLoading } = useProductQuery(slug as string);
    const [quantity, setQuantity] = useState(1);
    const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
    const [attribute_id, setSize] = useState("");
    const accessToken = Cookies.get("auth_token");

    if (isLoading) return <p>Loading...</p>;

    function handleLogin() {
        setModalView("LOGIN_VIEW");
        return openModal();
    }

    function addItemToTheCart() {
        if (attribute_id) {
            setAddToCartLoader(true);

            addToCart({ attribute_id, quantity, id: slug });
            setAddToCartLoader(false);

            toast("Added to the Wishlist", {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-right" : "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            toast("Please select you size", {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-right" : "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }

    const renderShareFunction = async () => {
        const refferal_code = Cookies.get("refferal_code");
        const path = `${window.location.href}?refferal_code=${refferal_code}`;

        try {
            await navigator.clipboard.writeText(path);
            toast("Product link copied", {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-right" : "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (err) {
            toast(`Failed to copy ${err}`, {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-right" : "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
            {width < 1025 ? (
                <Carousel
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={productGalleryCarouselResponsive}
                    className="product-gallery"
                    buttonGroupClassName="hidden"
                >
                    {data?.images?.map((item, index: number) => (
                        <SwiperSlide key={`product-gallery-key-${index}`}>
                            <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                                <img
                                    src={item?.image ?? data?.thumbnail}
                                    alt={`${data?.name}--${index}`}
                                    className="object-cover w-full"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Carousel>
            ) : (
                <div className="col-span-5 grid grid-cols-2 gap-2.5">
                    {data?.images?.map((item, index: number) => (
                        <div
                            key={index}
                            className="col-span-1 transition duration-150 ease-in hover:opacity-90"
                        >
                            <img
                                src={item?.image ?? data?.thumbnail}
                                alt={`${data?.name}--${index}`}
                                className="object-cover w-full"
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="col-span-4 pt-8 lg:pt-0">
                <div className="pb-7 mb-7 border-b border-gray-300">
                    <h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5 relative">
                        {data?.name}
                        <FaShareAlt
                            onClick={renderShareFunction}
                            className="cursor-pointer rtl:mr-1 absolute top-0 right-0"
                        />
                    </h2>
                    <p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
                        {data?.description}
                    </p>
                    <div className="flex items-center mt-5">
                        <div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl ltr:pr-2 rtl:pl-2 ltr:md:pr-0 rtl:md:pl-0 ltr:lg:pr-2 rtl:lg:pl-2 ltr:2xl:pr-0 rtl:2xl:pl-0">
                            ${data?.selling_price}
                        </div>
                        {/* {discount && (
                            <span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ltr:pl-2 rtl:pr-2">
                                {basePrice}
                            </span>
                        )} */}
                    </div>
                </div>

                <div className="pb-3 border-b border-gray-300">
                    <ProductAttributes
                        key={`popup-attribute-key${data?.attribute}`}
                        title={"Size"}
                        attributes={data?.attribute}
                        size={attribute_id}
                        setSize={setSize}
                    />
                </div>

                <div className="flex items-center gap-x-4 ltr:md:pr-32 rtl:md:pl-32 ltr:lg:pr-12 rtl:lg:pl-12 ltr:2xl:pr-32 rtl:2xl:pl-32 ltr:3xl:pr-48 rtl:3xl:pl-48  border-b border-gray-300 py-8">
                    <Counter
                        quantity={quantity}
                        onIncrement={() => setQuantity((prev) => prev + 1)}
                        onDecrement={() =>
                            setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                        }
                        disableDecrement={quantity === 1}
                    />
                    <Button
                        onClick={isAuthorized ? addItemToTheCart : handleLogin}
                        variant="slim"
                        className={`w-full md:w-6/12 xl:w-full ${
                            !attribute_id && "bg-gray-400 hover:bg-gray-400"
                        }`}
                        // disabled={!attribute_id}
                        loading={addToCartLoader}
                    >
                        <span className="py-2 3xl:px-8">Add to cart</span>
                    </Button>
                </div>

                <div className="py-6">
                    <ul className="text-sm space-y-5 pb-1">
                        {/* <li>
                            <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">
                                SKU:
                            </span>
                            {data?.sku}
                        </li> */}
                        <li>
                            <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">
                                Category:
                            </span>
                            <Link
                                href="/"
                                className="transition hover:underline hover:text-heading"
                            >
                                {data?.category ? data?.category : "N/A"}
                            </Link>
                        </li>
                    </ul>
                </div>

                <ProductMetaReview data={data} />
            </div>
        </div>
    );
};

export default ProductSingleDetails;
