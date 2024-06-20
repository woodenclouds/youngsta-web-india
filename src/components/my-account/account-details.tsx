import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
    useUpdateUserMutation,
    UpdateUserType,
} from "@framework/customer/use-update-customer";
import { useTranslation } from "next-i18next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { toast } from "react-toastify";
import { useWindowSize } from "react-use";
import { useSsrCompatible } from "@utils/use-ssr-compatible";

const AccountDetails: React.FC = () => {
    const [isUpdated, setUpdated] = useState(false);
    const { width } = useSsrCompatible(useWindowSize(), {
        width: 0,
        height: 0,
    });
    const onSuccess = (data: any) => {
        toast.success(data?.message, {
            progressClassName: "fancy-progress-bar",
            position: width > 768 ? "bottom-right" : "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        setUpdated(!isUpdated);
    };

    const { mutate: updateUser, isPending } = useUpdateUserMutation(onSuccess);
    const email = Cookies.get("email");

    useEffect(() => {
        const getData = async () => {
            const res = await http.get(API_ENDPOINTS.GET_ACCOUNT);
            reset({
                first_name: res?.data?.app_data?.data.first_name,
                last_name: res?.data?.app_data?.data.last_name,
                phone_number: res?.data?.app_data?.data.phone_number,
                email: email,
            });
        };
        getData();
    }, [isUpdated]);

    const { t } = useTranslation();
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            phone_number: "",
            email: email,
        },
    });

    function onSubmit(input: UpdateUserType) {
        updateUser(input);
    }

    return (
        <motion.div
            layout
            initial="from"
            animate="to"
            exit="from"
            //@ts-ignore
            variants={fadeInTop(0.35)}
            className={`w-full flex flex-col`}
        >
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
                {t("common:text-account-details")}
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full mx-auto flex flex-col justify-center "
                noValidate
            >
                <div className="flex flex-col space-y-4 sm:space-y-5">
                    <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
                        <Input
                            labelKey="First Name"
                            {...register("first_name", {
                                required: "forms:first-name-required",
                            })}
                            variant="solid"
                            className="w-full sm:w-1/2"
                            errorKey={errors.first_name?.message}
                        />
                        <Input
                            labelKey="Last Name"
                            {...register("last_name", {
                                required: "forms:last-name-required",
                            })}
                            variant="solid"
                            className="w-full sm:w-1/2"
                            errorKey={errors.last_name?.message}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
                        <Input
                            type="tel"
                            labelKey="Phone"
                            disabled
                            {...register("phone_number", {
                                required: "forms:phone-required",
                            })}
                            variant="solid"
                            className="w-full sm:w-1/2"
                            errorKey={errors.phone_number?.message}
                        />
                        <Input
                            type="email"
                            labelKey="Email"
                            disabled
                            value={email}
                            {...register("email", {
                                required: "forms:email-required",
                                pattern: {
                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "forms:email-error",
                                },
                            })}
                            variant="solid"
                            className="w-full sm:w-1/2"
                            errorKey={errors.email?.message}
                        />
                    </div>

                    <div className="relative">
                        <Button
                            type="submit"
                            loading={isPending}
                            disabled={isPending}
                            className="h-12 mt-3 w-full sm:w-32"
                        >
                            {t("common:button-save")}
                        </Button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default AccountDetails;
