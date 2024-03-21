import { useTranslation } from "next-i18next";
import { IoIosArrowForward } from "react-icons/io";
import Link from "./link";
import cn from "classnames";

const ListMenu = ({ dept, data, hasMegaMenu, menuIndex }: any) => {
    const { t } = useTranslation("menu");

    function formatString(str: string) {
        return str?.toLowerCase().replace(/\s+/g, "-");
    }
    return (
        <li
            className={cn(
                !hasMegaMenu ? "group relative groupchildren" : "groupchildren"
            )}
        >
            <Link
                href={`/category/${formatString(data?.name)}`}
                className="capitalize flex items-center py-2 ltr:pl-5 rtl:pr-5 ltr:xl:pl-7 rtl:xl:pr-7 ltr:pr-3 rtl:pl-3 ltr:xl:pr-3.5 rtl:xl:pl-3.5 hover:text-heading hover:bg-gray-300"
            >
                {data.icon && (
                    <span className="inline-flex ltr:mr-2 rtl:ml-2">
                        {data.icon}
                    </span>
                )}
                {t(data.name)}
                {data?.children?.length > 0 && (
                    <span className="text-sm mt-0.5 shrink-0 ltr:ml-auto rtl:mr-auto">
                        <IoIosArrowForward className="transition duration-300 ease-in-out text-body group-hover:text-black" />
                    </span>
                )}
            </Link>
            {data?.children?.length > 0 && (
                <SubMenu
                    dept={dept}
                    data={data?.children}
                    menuIndex={menuIndex}
                />
            )}
        </li>
    );
};

const SubMenu: React.FC<any> = ({ dept, data, menuIndex }) => {
    dept = dept + 1;
    return (
        <ul className="list-none absolute z-0 invisible w-56 py-3 bg-gray-200 opacity-0 subMenuChild shadow-subMenu ltr:right-full rtl:left-full ltr:2xl:right-auto rtl:2xl:left-auto ltr:2xl:left-full rtl:2xl:right-full top-4 groupchildren-hover:visible groupchildren-hover:opacity-100">
            {data?.map((menu: any, index: number) => {
                const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

                return (
                    <ListMenu
                        dept={dept}
                        data={menu}
                        hasSubMenu={menu?.children}
                        menuName={menuName}
                        key={menuName}
                        menuIndex={index}
                    />
                );
            })}
        </ul>
    );
};

export default ListMenu;
