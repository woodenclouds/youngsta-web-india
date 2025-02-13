import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { useEffect, useRef, useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    HydrationBoundary,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
// import { ReactQueryDevtools } from "@tanstack/react-query/devtools";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/common/default-seo";
import AuthCheck from "@components/auth/AuthCheck"; // Adjust the import path as necessary

// Load Open Sans and satisfy typeface font
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";
// external
import "react-toastify/dist/ReactToastify.css";
// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import "@styles/rc-drawer.css";
import { getDirection } from "@utils/get-direction";

import Loader from "../components/Loader"; // Adjust the import path as necessary

function handleExitComplete() {
    if (typeof window !== "undefined") {
        window.scrollTo({ top: 0 });
    }
}

function Noop({ children }: React.PropsWithChildren<{}>) {
    return <>{children}</>;
}

const queryClient = new QueryClient()

const CustomApp = ({ Component, pageProps }: AppProps) => {
    const [loading, setLoading] = useState(false);

    const queryClientRef = useRef<any>();
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient();
    }
    const router = useRouter();
    const dir = getDirection(router.locale);
    useEffect(() => {
        document.documentElement.dir = dir;
    }, [dir]);
    const Layout = (Component as any).Layout || Noop;

    useEffect(() => {
        const handleStart = (url: any) =>
            url !== router.asPath && setLoading(true);
        const handleComplete = () => setLoading(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);

    return (
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
            <QueryClientProvider client={queryClient}>
                {/* @ts-ignore */}
                <HydrationBoundary state={pageProps.dehydratedState}>
                    {/* @ts-ignore */}
                    <ManagedUIContext>
                        <Layout pageProps={pageProps}>
                            <DefaultSeo />
                            <AuthCheck>
                                {loading && <Loader />}

                                <Component {...pageProps} key={router.route} />
                            </AuthCheck>
                            <ToastContainer />
                        </Layout>
                        <ManagedModal />
                        <ManagedDrawer />
                    </ManagedUIContext>
                </HydrationBoundary>
                {/* <ReactQueryDevtools /> */}
            </QueryClientProvider>
        </AnimatePresence>
    );
};

export default appWithTranslation(CustomApp);
