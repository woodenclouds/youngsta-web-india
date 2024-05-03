import MinusIcon from "@components/icons/minus-icon";
import PlusIcon from "@components/icons/plus-icon";
import cn from "classnames";
import { useEffect, useState } from "react";
type CounterProps = {
    quantity: number;
    setQuantity: (item: any, quantity: number) => void;
    onDecrement: (item: any, quantity: number) => void;
    onIncrement: (quantity: number) => void;
    disableIncrement?: boolean;
    disableDecrement?: boolean;
    variant?: "default" | "dark";
    className?: string;
    item: any;
};
const Counter: React.FC<CounterProps> = ({
    quantity,
    setQuantity,
    onDecrement,
    onIncrement,
    disableIncrement = false,
    item,
    variant = "default",
}) => {
    const size = variant !== "dark" ? "12px" : "10px";

    const [quantityValue, setQuantityValue] = useState(quantity);

    return (
        <div
            className={cn(
                "group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0",
                {
                    "border h-11 md:h-12 border-gray-300":
                        variant === "default",
                    "h-8 md:h-9 shadow-navigation bg-heading":
                        variant === "dark",
                }
            )}
        >
            <button
                onClick={(e) => {
                    if (quantityValue <= 1) return;
                    setQuantityValue((prev) => prev - 1);
                    if (setQuantity) {
                        setQuantity((prev) => prev - 1);
                    }
                    onDecrement(item, quantityValue - 1);
                }}
                className={cn(
                    "flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none",
                    {
                        "w-10 md:w-12 text-heading border-e border-gray-300 hover:text-white hover:bg-heading":
                            variant === "default",
                        "w-8 md:w-9 text-white bg-heading hover:bg-gray-600 focus:outline-none":
                            variant === "dark",
                    }
                )}
                disabled={quantity === 1}
            >
                <MinusIcon width={size} />
            </button>

            <span
                className={cn(
                    "font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0",
                    {
                        "text-base text-heading w-12  md:w-20 xl:w-24":
                            variant === "default",
                        "text-sm text-white w-8 md:w-10 ": variant === "dark",
                    }
                )}
            >
                {item?.quantity}
            </span>

            <button
                onClick={(e) => {
                    setQuantityValue((prev) => prev + 1);
                    if (setQuantity) {
                        setQuantity((prev) => prev + 1);
                    }
                    onIncrement(item, quantityValue + 1);
                }}
                className={cn(
                    "flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none",
                    {
                        "w-10 md:w-12 text-heading border-s border-gray-300 hover:text-white hover:bg-heading":
                            variant === "default",
                        "w-8 md:w-9 text-white bg-heading hover:bg-gray-600 focus:outline-none":
                            variant === "dark",
                    }
                )}
                disabled={disableIncrement}
            >
                <PlusIcon width={size} height={size} />
            </button>
        </div>
    );
};
export default Counter;
