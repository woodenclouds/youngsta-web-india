import Input from "@components/ui/input";
import emailjs from "emailjs-com";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useTranslation } from "next-i18next";
import { useContactMutation } from "@framework/contact/use-contact";

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>();

  const { mutate: submitContact, isPending } = useContactMutation(() =>
    reset()
  );
  const { t } = useTranslation();

  const onSubmit = async (values: ContactFormValues) => {
    try {
      submitContact({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });
      // await emailjs.send(
      //     "YOUR_SERVICE_ID",
      //     "YOUR_TEMPLATE_ID",
      //     {
      //         from_name: values.name,
      //         from_email: values.email,
      //         to_email: "youngstatech@gmail.com",
      //         subject: values.subject,
      //         message_html: values.message,
      //     },
      //     "YOUR_USER_ID"
      // );
      // alert("Your message has been sent successfully!");
      // reset();
    } catch (error) {}
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto flex flex-col justify-center "
      noValidate
    >
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
          <Input
            labelKey="Name"
            placeholderKey="forms:placeholder-name"
            {...register("name", {
              required: "forms:name-required",
            })}
            className="w-full md:w-1/2 "
            errorKey={errors.name?.message}
            variant="solid"
          />
          <Input
            labelKey="Email"
            type="email"
            placeholderKey="forms:placeholder-email"
            {...register("email", {
              required: "forms:email-required",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "forms:email-error",
              },
            })}
            className="w-full md:w-1/2 ltr:md:ml-2.5 rtl:md:mr-2.5 ltr:lg:ml-5 rtl:lg:mr-5 mt-2 md:mt-0"
            errorKey={errors.email?.message}
            variant="solid"
          />
        </div>
        <Input
          labelKey="Subject"
          {...register("subject", { required: "forms:name-subject" })}
          className="relative"
          placeholderKey="forms:placeholder-subject"
          errorKey={errors.subject?.message}
          variant="solid"
        />
        <TextArea
          labelKey="forms:label-message"
          {...register("message")}
          className="relative mb-4"
          placeholderKey="forms:placeholder-message"
        />
        <div className="relative">
          <Button
            type="submit"
            className="h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
          >
            {t("common:button-send-message")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
