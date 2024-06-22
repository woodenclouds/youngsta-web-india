import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { useSignUpMutation, SignUpInputType } from "@framework/auth/use-signup";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const SignUpForm: React.FC = () => {
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleError = (error: any) => {
        setErrorMessage(error);
    };
    const { mutate: signUp, isPending } = useSignUpMutation(handleError);
    const { setModalView, openModal, closeModal } = useUI();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpInputType>();

    function handleSignIn() {
        setModalView("LOGIN_VIEW");
        return openModal();
    }

    function onSubmit({
        first_name,
        last_name,
        email,
        password,
        phone_number,
    }: SignUpInputType) {
        let country_code = "91";
        signUp({
            first_name,
            last_name,
            email,
            phone_number: phone_number,
            password,
            country_code,
        });
    }
    return (
        <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
            <div className="text-center mb-6 pt-2.5">
                <div onClick={closeModal}>
                    <Logo />
                </div>
                <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
                    {t("common:registration-helper")}{" "}
                    <Link
                        onClick={closeModal}
                        href={ROUTES.TERMS}
                        className="text-heading underline hover:no-underline focus:outline-none"
                    >
                        {t("common:text-terms")}
                    </Link>{" "}
                    &amp;{" "}
                    <Link
                        onClick={closeModal}
                        href={ROUTES.POLICY}
                        className="text-heading underline hover:no-underline focus:outline-none"
                    >
                        {t("common:text-policy")}
                    </Link>
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center"
                noValidate
            >
                <div className="flex flex-col space-y-4">
                    <Input
                        labelKey="First Name"
                        type="text"
                        variant="solid"
                        {...register("first_name", {
                            required: "First name required",
                        })}
                        errorKey={errors.first_name?.message}
                    />
                    <Input
                        labelKey="Last Name"
                        type="text"
                        variant="solid"
                        {...register("last_name", {
                            required: "Last name required",
                        })}
                        errorKey={errors.last_name?.message}
                    />

                    <Input
                        labelKey="Email"
                        type="email"
                        variant="solid"
                        {...register("email", {
                            required: `${t("forms:email-required")}`,
                            pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: t("forms:email-error"),
                            },
                        })}
                        errorKey={errors.email?.message}
                    />
                    <Input
                        labelKey="Phone Number"
                        type="text"
                        variant="solid"
                        maxLength={10} // This ensures only 10 digits can be entered
                        {...register("phone_number", {
                            required: `${t("forms:phone-required")}`,
                            pattern: {
                                value: /^[0-9]{10}$/, // This regex matches exactly 10 digits
                                message: t("Enter a valid 10-digit phone number"), // Custom error message for invalid input
                            },
                        })}
                        errorKey={errors.phone_number?.message}
                    />
                    <PasswordInput
                        labelKey="forms:label-password"
                        errorKey={errorMessage ?? errors.password?.message}
                        {...register("password", {
                            required: `${t("forms:password-required")}`,
                        })}
                    />

                    <div className="relative">
                        <Button
                            type="submit"
                            loading={isPending}
                            disabled={isPending}
                            className="h-11 md:h-12 w-full mt-2"
                        >
                            {t("common:text-register")}
                        </Button>
                    </div>
                </div>
            </form>

            <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
                {t("common:text-have-account")}{" "}
                <button
                    type="button"
                    className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
                    onClick={handleSignIn}
                >
                    {t("common:text-login")}
                </button>
            </div>
        </div>
    );
};

export default SignUpForm;
