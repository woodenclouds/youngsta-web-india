import { NextSeo } from 'next-seo';
import Header from '@components/layout/header/header';
import Footer from '@components/layout/footer/footer';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import Search from '@components/common/search';
import CookieBar from '@components/common/cookie-bar';
import { useAcceptCookies } from '@utils/use-accept-cookies';
import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
	const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
	const { t } = useTranslation('common');
	return (
		<div className="flex flex-col min-h-screen">
			<NextSeo
				additionalMetaTags={[
					{
						name: 'viewport',
						content: 'width=device-width, initial-scale=1.0',
					},
				]}
				title="Youngsta React - React Next E-commerce Template"
				description="Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS."
				canonical="https://youngsta.vercel.app/"
				openGraph={{
					url: 'https://youngsta.vercel.app/',
					title: 'Youngsta React - React Next E-commerce Template',
					description:
						'Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.',
					images: [
						{
							url: "https://youngsta.s3.eu-north-1.amazonaws.com/og-image-01.png",
							width: 800,
							height: 600,
							alt: 'Og Image Alt',
						},
						{
							url: "https://youngsta.s3.eu-north-1.amazonaws.com/og-image-01.png",
							width: 900,
							height: 800,
							alt: 'Og Image Alt Second',
						},
					],
				}}
			/>
			<Header />
			<main
				className="relative flex-grow"
				style={{
					minHeight: '-webkit-fill-available',
					WebkitOverflowScrolling: 'touch',
				}}
			>
				{children}
			</main>
			<Footer />
			<MobileNavigation />
			<Search />
			<CookieBar
				title={t('text-cookies-title')}
				hide={acceptedCookies}
				action={
					<Button onClick={() => onAcceptCookies()} variant="slim">
						{/* @ts-ignore */}
						{t('text-accept-cookies')}
					</Button>
				}
			/>
		</div>
	);
}
