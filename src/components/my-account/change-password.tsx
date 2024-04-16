import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { toast } from "react-toastify";

import {
    useChangePasswordMutation,
    ChangePasswordInputType,
} from "@framework/customer/use-change-password";
import { useTranslation } from "next-i18next";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useWindowSize } from "react-use";

const defaultValues = {
    old_password: "",
    new_password: "",
};

const ChangePassword: React.FC = () => {
    const { width } = useSsrCompatible(useWindowSize(), {
        width: 0,
        height: 0,
    });
    const renderToast = (string: string) => {
        toast(string, {
            progressClassName: "fancy-progress-bar",
            position: width > 768 ? "bottom-right" : "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };
    const { mutate: changePassword, isPending } =
        useChangePasswordMutation(renderToast);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordInputType>({
        defaultValues,
    });
    function onSubmit(input: ChangePasswordInputType) {
        changePassword(input);
    }
    const { t } = useTranslation();
    return (
        <>
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
                {t("common:text-change-password")}
            </h2>
            <motion.div
                layout
                initial="from"
                animate="to"
                exit="from"
                //@ts-ignore
                variants={fadeInTop(0.35)}
                className={`w-full flex  h-full lg:w-8/12 flex-col`}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full mx-auto flex flex-col justify-center "
                >
                    <div className="flex flex-col space-y-3">
                        <PasswordInput
                            labelKey="forms:label-old-password"
                            errorKey={errors.old_password?.message}
                            {...register("old_password", {
                                required: "forms:password-old-required",
                            })}
                            className="mb-4"
                        />
                        <PasswordInput
                            labelKey="forms:label-new-password"
                            errorKey={errors.new_password?.message}
                            {...register("new_password", {
                                required: "forms:label-new-password",
                            })}
                            className="mb-4"
                        />

                        <div className="relative">
                            <Button
                                type="submit"
                                loading={isPending}
                                disabled={isPending}
                                className="h-13 mt-3"
                            >
                                {t("common:text-change-password")}
                            </Button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </>
    );
};

export default ChangePassword;
