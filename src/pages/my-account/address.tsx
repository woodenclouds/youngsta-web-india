import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import AddressManagement from "@components/my-account/address-management";

export default function AccountDetailsPage() {
	return (
		<AccountLayout>
			<AddressManagement />
		</AccountLayout>
	);
}

AccountDetailsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
