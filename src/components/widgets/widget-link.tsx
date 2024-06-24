import React, { useEffect, type FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import Cookies from "js-cookie";

interface Props {
  className?: string;
  data: {
    widgetTitle?: string;
    lists: {
      id: string;
      path?: string;
      title: string;
      icon?: any;
    }[];
    logo?: any;
    description?: string;
    isCompanyIntroduction?: boolean;
  };
  variant?: "contemporary";
}

const WidgetLink: FC<Props> = ({ className, data }) => {
  const { widgetTitle, lists } = data;
  const { logo, description } = data;
  const { t } = useTranslation("footer");
  const { isAuthorized, setModalView, openModal } = useUI();
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const token = Cookies.get("auth_token");

  useEffect(() => {
    if (token) {
      setAccessToken(token);
    }
  }, [token]);
  return (
    <div
      className={`${className} ${data?.isCompanyIntroduction && "col-span-2"}`}
    >
      {!data?.isCompanyIntroduction ? (
        <>
          <h4 className="mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">
            {t(`${widgetTitle}`)}
          </h4>
          <ul className="list-none text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
            {lists.map((list, index) => (
              <li
                key={`widget-list--key${list.id}`}
                className="flex items-baseline"
              >
                {list.icon && (
                  <span className="ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                    {list.icon}
                  </span>
                )}
                {list.title === "Login" || list.title === "Register" ? (
                  token ? (
                    <Link href="/my-account">
                      <a className={`${index == 1 ? "hidden" : ""}`}>
                        My Account
                      </a>
                    </Link>
                  ) : (
                    <span
                      className="cursor-pointer transition-colors duration-200 hover:text-black"
                      onClick={() => {
                        setModalView("LOGIN_VIEW");
                        openModal();
                      }}
                    >
                      {t(`${list.title}`)}
                    </span>
                  )
                ) : (
                  <Link href={list.path ? list.path : "#!"}>
                    <a className="transition-colors duration-200 hover:text-black">
                      {t(`${list.title}`)}
                    </a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="ltr:mr-4 rtl:ml-4 flex flex-col space-y-7 lg:space-y-7.5">
          <Logo className="" />
          <p className="text-sm font-normal text-[#1D1E1F] leading-6 max-w-[334px] ">
            {description}
          </p>
          <ul className="list-none text-xs lg:text-sm text-body flex items-center gap-x-3 lg:gap-x-3.5">
            {lists.map((list) => (
              <li
                key={`widget-list--key${list.id}`}
                className="flex items-baseline"
              >
                {list.icon && (
                  <span className="ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                    {list.icon}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WidgetLink;
