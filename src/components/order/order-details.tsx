import { useOrderQuery } from "@framework/order/get-order";
import { OrderItem } from "@framework/types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Button from "@components/ui/button";
const OrderItemCard = ({ product }: { product: OrderItem }) => {
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
                    <button className="text-[12px]  mr-[10px] leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600">
                        Return
                    </button>
                    <button className="text-[12px]  mr-[10px] leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600">
                        Cancel
                    </button>
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
    const { data: order, isLoading } = useOrderQuery(id?.toString()!);

    console.log("order", order);

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
                        <OrderItemCard key={index} product={product} />
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
