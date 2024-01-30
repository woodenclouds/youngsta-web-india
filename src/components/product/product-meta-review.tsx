import { useState } from "react";
import { Collapse } from "@components/common/accordion";
import ReviewForm from "@components/common/form/review-form";

interface Props {
    data: any;
}

const ProductMetaReview: React.FC<Props> = ({ data }) => {
    const [expanded, setExpanded] = useState<number>(0);
    console.log("ProductMetaReview", data);
    return (
        <>
            <Collapse
                i={data?.id}
                key={data.title}
                title={data.title}
                translatorNS="review"
                content={
                    <>
                        {data.content} <ReviewForm />
                    </>
                }
                expanded={expanded}
                setExpanded={setExpanded}
                variant="transparent"
            />
        </>
    );
};

export default ProductMetaReview;
