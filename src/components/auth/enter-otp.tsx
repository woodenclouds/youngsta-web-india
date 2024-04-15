import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import {
    useVerifyMutation,
    LoginInputType,
} from "@framework/auth/use-verify-otp";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import Cookies from "js-cookie";

const EnterOtp: React.FC = () => {
    const { closeModal } = useUI();
    const { mutate: verify, isPending } = useVerifyMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputType>();

    function onSubmit({ otp }: LoginInputType) {
        let email = (
            Cookies.get("signup_mail") ? Cookies.get("signup_mail") : ""
        ) as string;

        verify({
            otp,
            email,
        });
    }

    return (
        <div className="w-full px-5 py-5 mx-auto overflow-hidden bg-white border border-gray-300 rounded-lg sm:w-96 md:w-450px sm:px-8">
            <div className="text-center mb-6 pt-2.5">
                <div onClick={closeModal}>
                    <Logo />
                </div>
                <p className="mt-2 mb-8 text-sm md:text-base text-body sm:mb-10">
                    Enter Your OTP
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center"
                noValidate
            >
                <div className="flex flex-col space-y-3.5">
                    <Input
                        labelKey="OTP"
                        type="number"
                        variant="solid"
                        placeholderKey="Enter OTP"
                        {...register("otp", {
                            required: `OTP is required`,
                            pattern: {
                                value: /^[0-9]{4}$/,
                                message: "Invalid OTP",
                            },
                        })}
                        errorKey={errors.otp?.message}
                    />

                    <div className="relative">
                        <Button
                            type="submit"
                            loading={isPending}
                            disabled={isPending}
                            className="h-11 md:h-12 w-full mt-1.5"
                        >
                            Verify
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EnterOtp;
