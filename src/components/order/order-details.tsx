import { useOrderQuery } from "@framework/order/get-order";
import { OrderItem } from "@framework/types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Button from "@components/ui/button";
import { useReturnMutation } from "@framework/order/use-return-query";
import { toast } from "react-toastify";
import { useWindowSize } from "react-use";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useCancelMutation } from "@framework/order/cancel-item-query";
import { useState } from "react";
const OrderItemCard = ({
    product,
    onReturn,
    onCancel,
    isReturnLoading,
    isCancelLoading,
    selectedId,
}: {
    product: OrderItem;
    onReturn: any;
    onCancel: any;
    isReturnLoading: boolean;
    isCancelLoading: boolean;
    selectedId: any;
}) => {
    return (
        <tr
            className="font-normal border-b border-gray-300 last:border-b-0"
            key={product.id}
        >
            <td className="p-4">
                {product.product_details?.name} * {product.quantity}
            </td>
            <td className="p-4">₹{product?.price}</td>
            <td>
                <div className="flex ">
                    {!product?.is_returned && !product?.is_cancelled && (
                        <button
                            disabled={isReturnLoading}
                            onClick={() => onReturn(product?.id)}
                            className="text-[12px] inline-flex items-center  mr-[10px] leading-4 bg-heading text-white px-4 py-2.5  rounded-md hover:text-white hover:bg-gray-600"
                        >
                            Return{" "}
                            {isReturnLoading && selectedId === product?.id && (
                                <>
                                    <svg
                                        className="animate-spin ltr:-mr-1 rtl:-ml-1 ltr:ml-3 rtl:mr-3 h-3 w-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                </>
                            )}
                        </button>
                    )}
                    {!product?.is_cancelled && (
                        <button
                            disabled={isCancelLoading}
                            onClick={() => onCancel(product?.id)}
                            className="text-[12px]  mr-[10px] leading-4 bg-heading text-white px-4 py-2.5 inline-flex items-center rounded-md hover:text-white hover:bg-gray-600"
                        >
                            Cancel
                            {isCancelLoading && selectedId === product?.id && (
                                <>
                                    <svg
                                        className="animate-spin ltr:-mr-1 rtl:-ml-1 ltr:ml-3 rtl:mr-3 h-3 w-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};
const OrderDetails: React.FC<{ className?: string }> = ({
    className = "pt-10 lg:pt-12",
}) => {
    const {
        query: { id },
    } = useRouter();
    const { t } = useTranslation("common");
    const { width } = useSsrCompatible(useWindowSize(), {
        width: 0,
        height: 0,
    });
    const { data: order, isLoading } = useOrderQuery(id?.toString()!);
    const [selectedId, setSelectedId] = useState(null);

    const handleSuccess = (data: any) => {
        toast.success(data?.message ?? "Operation Successful", {
            progressClassName: "fancy-progress-bar",
            position: width > 768 ? "bottom-right" : "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleError = (data: any) => {
        toast.error(data?.message ?? "Something went wrong", {
            progressClassName: "fancy-progress-bar",
            position: width > 768 ? "bottom-right" : "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const { mutate: returnItem, isPending: isReturnLoading } =
        useReturnMutation(handleSuccess, handleError);

    const { mutate: cancelItem, isPending: isCancelLoading } =
        useCancelMutation(handleSuccess, handleError);

    function onReturn(id: any) {
        setSelectedId(id);
        returnItem(id);
    }

    function onCancel(id: any) {
        setSelectedId(id);
        cancelItem(id);
    }

    if (isLoading) return <p>Loading...</p>;
    return (
        <div className={className}>
            <h2 className="mb-6 text-lg font-bold md:text-xl xl:text-2xl text-heading xl:mb-8">
                {t("text-order-details")}:
            </h2>

            <table className="w-full text-sm font-semibold text-heading lg:text-base">
                <thead>
                    <tr>
                        <th className="w-1/2 p-4 bg-gray-150 ltr:text-left rtl:text-right ltr:first:rounded-tl-md rtl:first:rounded-tr-md">
                            {t("text-product")}
                        </th>
                        <th className="w-1/2 p-4 bg-gray-150 ltr:text-left rtl:text-right ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
                            {t("text-total")}
                        </th>
                        <th className="w-1/2 p-4 !text-center bg-gray-150 ltr:text-left rtl:text-right ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    {order?.products?.map((product, index) => (
                        <OrderItemCard
                            key={index}
                            product={product}
                            onReturn={onReturn}
                            onCancel={onCancel}
                            isReturnLoading={isReturnLoading}
                            isCancelLoading={isCancelLoading}
                            selectedId={selectedId}
                        />
                    ))}
                </tbody>
                <tfoot className="">
                    <tr className="odd:bg-gray-150">
                        <td className="p-4 italic">{t("text-sub-total")}:</td>
                        <td className="p-4">₹{order?.total_amount}</td>
                        <td className="p-4"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default OrderDetails;
