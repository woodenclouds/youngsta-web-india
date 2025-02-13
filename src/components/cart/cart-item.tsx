import Link from "@components/ui/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { IoIosCloseCircle } from "react-icons/io";
import Counter from "@components/common/counter";
import { ROUTES } from "@utils/routes";
import { generateCartItemName } from "@utils/generate-cart-item-name";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { countryData } from "../../utils/currencies";

type CartItemProps = {
  item: any;
  editCartItems?: any;
  deleteCartItems?: any;
  isCheckout?: boolean;
  isWishlist?: boolean;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  editCartItems,
  deleteCartItems,
  isCheckout,
  isWishlist,
}) => {
  const { t } = useTranslation("common");
  const [totalPrice, setTotalPrice] = useState(
    item?.attribute?.price * item.quantity
  );
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setTotalPrice(item?.attribute?.price * item.quantity);
  }, [item?.attribute?.price, item.quantity]);

  useEffect(() => {
    if (quantity !== item.quantity) {
      setTotalPrice(item?.attribute?.price * quantity);
    }
  }, [quantity]);

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className={`group w-full h-auto flex justify-start items-center bg-white py-4 md:py-7 border-b border-gray-100 relative last:border-b-0`}
      title={item?.name}
    >
      <div className="relative flex flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-200 rounded-md cursor-pointer md:w-28 md:h-28 ltr:mr-4 rtl:ml-4">
        <Image
          src={
            item?.product_info?.thumbnail ?? "/assets/placeholder/cart-item.svg"
          }
          width={112}
          height={112}
          loading="eager"
          alt={item.name || "Product Image"}
          className="object-cover bg-gray-300"
        />
        {!isCheckout && (
          <div
            className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
            onClick={() => deleteCartItems(item.id)}
            role="button"
          >
            <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        {/* <div className="top flex items-center justify-between"> */}
        <div className="top flex  justify-between mb-2.5">
          <div className="left">
            <Link
              href={`${ROUTES.PRODUCT}/${item?.product_info?.id}`}
              className="truncate text-sm text-heading mb-1.5 -mt-1 block"
            >
              {generateCartItemName(item?.product_info?.name, item?.attributes)}
            </Link>
            {/* @ts-ignore */}
            <span className="text-sm text-gray-400">
              {t("text-unit-price")} : &nbsp; {countryData?.symbol}
              {item?.attribute?.price}
            </span>
          </div>
          <div className="right">
            <span className="block text-[16px]">{item?.attribute?.name}</span>
            <span className="block text-[16px] text-black bold">
              {item?.attribute?.value}
            </span>
          </div>
        </div>
        {isWishlist ? null : (
          <div className="flex items-end justify-between">
            <Counter
              quantity={quantity}
              setQuantity={setQuantity}
              onIncrement={editCartItems}
              onDecrement={editCartItems}
              removeHandler={()=> {
                deleteCartItems(item.id)
                console.log("removeHandler");
                
              }}
              item={item}
              variant="dark"
            />
            <span className="text-sm font-semibold leading-5 md:text-base text-heading">
              {countryData?.symbol}
              {totalPrice}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartItem;
