import cn from "classnames";
interface Props {
    className?: string;
    title: string;
    attributes: {
        id: string;
        value: string;
        meta: string;
        image: string;
    }[];
    size?: string;
    setSize?: any;
}

export const ProductAttributes: React.FC<Props> = ({
    className = "mb-4",
    title,
    attributes,
    size,
    setSize,
}) => {
    return (
        <div className={className}>
            <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
                {title}
            </h3>
            <ul className="flex flex-wrap colors ltr:-mr-3 rtl:-ml-3">
                {attributes?.map(({ id, value, meta, image }) => (
                    <li
                        key={`${value}-${id}`}
                        className={cn(
                            "cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
                            id === size ? "border-black" : "border-gray-100"
                        )}
                        onClick={() => {
                            setSize(id);
                        }}
                    >
                        {title === "color" ? (
                            <span
                                className="flex justify-center w-full h-full rounded"
                                style={{ backgroundColor: meta }}
                            >
                                <img
                                    src={image}
                                    alt={value}
                                    className="h-full"
                                />
                            </span>
                        ) : (
                            value
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
