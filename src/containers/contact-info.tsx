import { FC } from "react";
import { IoLocationSharp, IoMail, IoCallSharp } from "react-icons/io5";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
const mapImage = "/assets/images/map-image.jpg";
const data = [
    {
        id: 1,
        slug: '',
        icon: <IoLocationSharp />,
        name: "text-address",
        description:
            "1/30/B, AVM BUILDING, THANIKKUDAM CENTER, THANIKUDAM,KURICHIKKARA, THRISSUR, KERALA, 680028, KURICHIKKARA, Kerala, PIN: 680028 Operational Address: 1/30/B, AVM BUILDING, THANIKKUDAM CENTER, THANIKUDAM, KURICHIKKARA, THRISSUR, KERALA, 680028, KURICHIKKARA, Kerala, PIN: 680028",
    },
    {
        id: 2,
        slug: "mailto:youngstatech@gmail.com",
        icon: <IoMail />,
        name: "text-email",
        description: "youngstatech@gmail.com",
    },
    {
        id: 3,
        slug: "tel:+917306169756",
        icon: <IoCallSharp />,
        name: "text-phone",
        description: "7306169756",
    },
];
interface Props {
    image?: HTMLImageElement;
}
const ContactInfoBlock: FC<Props> = () => {
    const { t } = useTranslation("common");
    return (
        <div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
            <h4 className="text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1">
                {t("text-find-us-here")}
            </h4>
            {data?.map((item: any) => (
                <div key={`contact--key${item.id}`} className="flex pb-7">
                    <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
                        {item.icon}
                    </div>
                    <div className="flex flex-col ltr:pl-3 rtl:pr-3 ltr:2xl:pl-4 rtl:2xl:pr-4">
                        <h5 className="text-sm font-bold text-heading">
                            {t(`${item.name}`)}
                        </h5>
                        <Link href={item.slug} className="text-sm mt-0">
                            {t(`${item.description}`)}
                        </Link>
                    </div>
                </div>
            ))}
            {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15688.314552973517!2d76.25335685174025!3d10.573019376512365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ef5a14446273%3A0x8aa7e4e9567c86cb!2sThanikkudam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1710618686564!5m2!1sen!2sin"
                width="100%"
                height="450"
                className="rounded-md"
                loading="lazy"></iframe> */}
            {/* <img src={mapImage} alt={t("text-map")} " /> */}
        </div>
    );
};

export default ContactInfoBlock;
