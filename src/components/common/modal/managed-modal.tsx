import { useUI } from "@contexts/ui.context";
import Modal from "./modal";
import dynamic from "next/dynamic";
import Newsletter from "../newsletter";
import EnterOtp from "@components/auth/enter-otp";
const LoginForm = dynamic(() => import("@components/auth/login-form"));
const SignUpForm = dynamic(() => import("@components/auth/sign-up-form"));
const ForgetPasswordForm = dynamic(
    () => import("@components/auth/forget-password-form")
);
const ProductPopup = dynamic(() => import("@components/product/product-popup"));
const ManagedModal: React.FC = () => {
    const { displayModal, closeModal, modalView } = useUI();
    return (
        <Modal open={displayModal} onClose={closeModal}>
            {modalView === "LOGIN_VIEW" && <LoginForm />}
            {modalView === "ENTER_OTP" && <EnterOtp />}
            {modalView === "SIGN_UP_VIEW" && <SignUpForm />}
            {modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />}
            {modalView === "PRODUCT_VIEW" && <ProductPopup />}
            {modalView === "NEWSLETTER_VIEW" && <Newsletter />}
        </Modal>
    );
};

export default ManagedModal;
