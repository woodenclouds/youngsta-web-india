import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import Wallet from "@components/my-account/wallet";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function WalletDetailsPage() {
	return (
		<AccountLayout>
			<Wallet />
		</AccountLayout>
	);
}

WalletDetailsPage.Layout = Layout;

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
