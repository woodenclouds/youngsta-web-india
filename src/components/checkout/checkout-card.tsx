import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useTranslation } from 'next-i18next';
import { useFetchCartItemsQuery } from '@framework/cart/get-cart-items';
import CartItem from '@components/cart/cart-item';
import { useState } from 'react';
import { useEditCartMutation } from '@framework/cart/edit-cart';

const CheckoutCard: React.FC = () => {
  const { total, isEmpty } = useCart();
  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  });
  const { t } = useTranslation('common');
  const checkoutFooter = [
    {
      id: 1,
      name: t('text-sub-total'),
      price: subtotal,
    },
    {
      id: 2,
      name: t('text-shipping'),
      price: t('text-free'),
    },
    {
      id: 3,
      name: t('text-total'),
      price: subtotal,
    },
  ];
  const [cartTotal, setCartTotal] = useState(0);
  const { mutate: editCart } = useEditCartMutation();
  function editCartItems(item: any, quantity: number) {
    let attribute_id = item?.attribute_id;
    let id = item?.id;
    editCart({ attribute_id, quantity, id });
  }
  const { data: items} = useFetchCartItemsQuery({
    limit: 10,
  });
  return (
    <div className="pt-12 md:pt-0 ltr:2xl:pl-4 rtl:2xl:pr-4">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t('text-your-order')}
      </h2>
      <div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
        <span>{t('text-product')}</span>
        <span className="ltr:ml-auto rtl:mr-auto flex-shrink-0">
          {t('text-sub-total')}
        </span>
      </div>
      
      {items?.map((item) => (
              <CartItem
                item={item}
                key={item.id}
                setCartTotal={setCartTotal}
                editCartItems={editCartItems}
              />
            ))}

      {checkoutFooter.map((item: any) => (
        <CheckoutCardFooterItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default CheckoutCard;
