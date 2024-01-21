type FooterItemProps = {
  id: string;
  product_info?: { name: string }; // Make product_info optional
  price: string;
};

export const CheckoutCardFooterItem: React.FC<{ item: FooterItemProps }> = ({
  item,
}) => {
  return (
    <div className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
      {item.product_info?.name ?? 'Unknown Product'}
      <span className="ltr:ml-auto rtl:mr-auto flex-shrink-0">
        {item.price}
      </span>
    </div>
  );
};
