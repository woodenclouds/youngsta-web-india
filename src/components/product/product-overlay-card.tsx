import Image from "next/image";
import { useUI } from "@contexts/ui.context";
import Link from "@components/ui/link";
import { Product } from "@framework/types";
import Text from "@components/ui/text";
import cn from "classnames";
import { toast } from "react-toastify";
import { FaRegHeart } from "react-icons/fa";
import { useAddToWishlistMutation } from "@framework/wishlist/add-to-wishlist";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useWindowSize } from "react-use";
import { useState } from "react";
import { countryData } from "@utils/currencies";

interface ProductProps {
    product: Product;
    index: number;
    imgLoading?: "eager" | "lazy";
    variant?: "left" | "center" | "combined" | "flat" | "modern";
    disableBorderRadius?: boolean;
    category?: string;
}

const ProductOverlayCard: React.FC<ProductProps> = ({
    product = { variants: [] },
    index,
    variant = "left",
    imgLoading = "lazy",
    disableBorderRadius = false,
    category,
}) => {
    let size = 260;
    let classes;

    if (
        (variant === "left" && index === 0) ||
        (variant === "center" && index === 1) ||
        (variant === "combined" && index === 0)
    ) {
        classes = "row-span-full lg:row-span-2 col-span-full lg:col-span-2";
        size = 620;
    } else if (variant === "combined") {
        if (index === 2) {
            classes = "col-span-2 lg:col-span-1 lg:row-span-2";
            size = 620;
        } else {
            classes = "col-span-2 lg:col-span-1";
            size = 620;
        }
    } else if (variant === "modern") {
        classes = "col-span-2 md:row-span-2";
        size = 620;
    } else {
        classes = "col-span-2 lg:col-span-1";
    }
    const { width } = useSsrCompatible(useWindowSize(), {
        width: 0,
        height: 0,
    });

    const { openModal, setModalView, setModalData, isAuthorized } = useUI();

    const [isActive, setIsActive] = useState(false);

    const onSuccess = (data: any) => {
        toast.success(data?.data?.message ?? "Operation Successful", {
            progressClassName: "fancy-progress-bar",
            position: width > 768 ? "bottom-right" : "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const onError = (data: any) => {
        toast.error(data?.message, {
            progressClassName: "fancy-progress-bar",
            position: width > 768 ? "bottom-right" : "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const { mutate: addToWishList } = useAddToWishlistMutation(
        onSuccess,
        onError
    );

    function handleLogin() {
        setModalView("LOGIN_VIEW");
        return openModal();
    }

    const handleToggleAndAddToWishList = (productId: any) => {
        if (isAuthorized) {
            addToWishList({ id: productId });
            setIsActive(!isActive);
        } else {
            handleLogin();
        }
    };

    return (
        <Link
            href={"/products/" + product?.id}
            className={`${classes} cursor-pointer group flex flex-col bg-gray-200 ${
                !disableBorderRadius && "rounded-md"
            } relative items-center justify-between overflow-hidden`}
        >
            <div
                className={`absolute right-[11px] top-[6px] bg-[#ffff] p-[11px] flex items-center z-[1] rounded-[50%] cursor-pointer ${
                    isActive || product?.is_wishlist ? "text-red-500" : ""
                }`}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleToggleAndAddToWishList(product?.id);
                }}
            >
                <FaRegHeart className="w-[20px] h-[20px]" />
            </div>
            <div
                className={cn(
                    "flex justify-center items-center p-4 h-full 3xl:min-h-[330px]",
                    {
                        "!p-0": variant === "modern",
                    }
                )}
                title={product?.name}
            >
                <Image
                    src={product?.thumbnail}
                    width={size}
                    height={size}
                    objectFit="contain"
                    loading={imgLoading}
                    alt={product?.name || "Product Image"}
                    className="transition duration-500 ease-in-out transform group-hover:scale-110"
                />
            </div>

            {variant === "modern" && (
                <span
                    className={cn(
                        "absolute top-3.5 md:top-5 3xl:top-7 ltr:left-3.5 rtl:right-3.5 ltr:md:left-5 rtl:md:right-5 ltr:3xl:left-7 rtl:3xl:right-7 bg-[#B26788] text-white text-10px md:text-sm leading-5 inline-block px-2 xl:px-3 pt-0.5 pb-1",
                        {
                            "!py-0.5": variant === "modern",
                            "rounded-md ": !disableBorderRadius,
                        }
                    )}
                >
                    Featured
                </span>
            )}

            <div
                className="flex flex-col w-full px-4 pb-4 md:flex-row lg:flex-col 2xl:flex-row md:justify-between md:items-center lg:items-start 2xl:items-center md:px-5 3xl:px-7 md:pb-5 3xl:pb-7"
                title={product?.name}
            >
                <div className="overflow-hidden ltr:md:pr-2 rtl:md:pl-2 ltr:lg:pr-0 rtl:lg:pl-0 ltr:2xl:pr-2 rtl:2xl:pl-2">
                    <h2 className="mb-1 text-sm font-semibold truncate text-heading md:text-base xl:text-lg">
                        {product?.name}
                    </h2>

                    {variant !== "modern" ? (
                        <p className="text-body text-xs xl:text-sm leading-normal xl:leading-relaxed truncate max-w-[250px]">
                            {product?.description}
                        </p>
                    ) : (
                        <Text className="pb-0.5 truncate">
                            35 Brands, 1000+ Products
                        </Text>
                    )}
                </div>

                <div className="flex-shrink-0 flex flex-row-reverse md:flex-col lg:flex-row-reverse 2xl:flex-col items-center md:items-end lg:items-start 2xl:items-end justify-end ltr:md:text-right rtl:md:text-left lg:ltr:text-left rtl:text-right ltr:xl:text-right rtl:xl:text-left mt-2 md:-mt-0.5 lg:mt-2 2xl:-mt-0.5">
                    <div className="text-heading font-segoe font-semibold text-base md:text-xl lg:text-base xl:text-xl 3xl:text-2xl 3xl:mt-0.5 ltr:pr-2 rtl:pl-2 ltr:md:pr-0 rtl:md:pl-0 ltr:lg:pr-2 rtl:lg:pl-2 ltr:2xl:pr-0 rtl:2xl:pl-0">
                        {countryData?.symbol}
                        {product?.selling_price}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductOverlayCard;
