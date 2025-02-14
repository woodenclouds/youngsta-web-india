import Link from "@components/ui/link";
import { FaChevronDown } from "react-icons/fa";
import MegaMenu from "@components/ui/mega-menu";
import classNames from "classnames";
import ListMenu from "@components/ui/list-menu";
import { useTranslation } from "next-i18next";

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  const { t } = useTranslation("menu");
  console.log(data, "_____data____");

  function formatString(str: string) {
    return str?.replace(/\s+/g, "-");
  }
  return (
    <nav
      className={classNames(
        `headerMenu flex w-full relative justify-center`,
        className
      )}
    >
      {data?.map((item: any) => (
        <div
          className={`menuItem group cursor-pointer py-7 ${
            item.children ? "relative" : ""
          }`}
          key={item.id}
        >
          <Link
            href={`/category/${formatString(item?.name)}`}
            className="capitalize relative inline-flex items-center px-3 py-2 text-sm font-normal xl:text-base text-heading xl:px-4 group-hover:text-black"
          >
            {t(item.name)}
            {/* {item?.children?.length > 0 && (
                            <span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
                                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
                            </span>
                        )} */}
          </Link>

          {/* {item?.children && Array.isArray(item.children) && (
                        <div className="absolute invisible bg-gray-200 opacity-0 group-hover:visible children shadow-header ltr:left-0 rtl:right-0 group-hover:opacity-100">
                            <ul className="py-5 text-sm text-body list-none">
                                {item.children.map(
                                    (menu: any, index: number) => {
                                        const dept: number = 1;
                                        const menuName: string = `sidebar-menu-${dept}-${index}`;

                                        return (
                                            <ListMenu
                                                dept={dept}
                                                data={menu}
                                                hasSubMenu={menu.children}
                                                menuName={menuName}
                                                key={menuName}
                                                menuIndex={index}
                                            />
                                        );
                                    }
                                )}
                            </ul>
                        </div>
                    )} */}
        </div>
      ))}
      <div className={`menuItem group cursor-pointer py-7`}>
        <Link
          href={`/products`}
          className="capitalize relative inline-flex items-center px-3 py-2 text-sm font-normal xl:text-base text-heading xl:px-4 group-hover:text-black"
        >
          All Products
        </Link>
      </div>
    </nav>
  );
};

export default HeaderMenu;
