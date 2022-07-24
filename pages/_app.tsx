import 'styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { SiteContextProvider } from 'lib/SiteContext';
import { Footer } from 'components/Footer';
import { PageLoading } from 'components/PageLoading';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const loadingIndicatorDelay = 200;

export default function App({ Component, pageProps }: AppProps) {
    const [isLoading, setLoading] = useState(false);
    const [isShowingLoadingIndicator, setShowingLoadingIndicator] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleStart = (_url: string, { shallow }: { shallow: boolean }) => {
            if (!shallow) setLoading(true);
        };

        const handleEnd = () => {
            setLoading(false);
        };

        const handleError = handleEnd;

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeError", handleError);
        router.events.on("routeChangeComplete", handleEnd);

        return () => {
            router.events.on("routeChangeStart", handleStart);
            router.events.on("routeChangeError", handleError);
            router.events.on("routeChangeComplete", handleEnd);
        };
    }, []);

    useEffect(() => {
        if (isLoading) {
            const timeout = setTimeout(() => {
                setShowingLoadingIndicator(true);
            }, loadingIndicatorDelay);

            return () => clearTimeout(timeout);
        } else {
            setShowingLoadingIndicator(false);
        }
    }, [isLoading]);

    const siteContext = {};

    return <SiteContextProvider value={siteContext}>
        <DefaultSeo
            openGraph={{
                type: "website",
                locale: "en_US",
                site_name: "Anthony Li (anli5005)",
                images: [
                    {
                        url: "https://anli.dev/images/logo.png",
                        width: 128,
                        height: 128
                    }
                ]
            }}
            twitter={{
                site: "@anli5005",
                cardType: "summary"
            }}
        />
        <div className="sm:flex sm:container mx-auto sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <nav className="bg-blue-500 h-14 sm:h-fit sm:w-14 sm:mr-4 lg:mr-6 flex-shrink-0 sm:sticky top-4 lg:top-8 sm:mt-12 md:mt-24 lg:mt-28 xl:mt-36 2xl:mt-40">
                Nav
            </nav>
            <div className="flex-grow p-4 sm:p-0">
                <div className="sm:pt-4 pb-4 sm:h-12 md:h-24 lg:h-28 xl:h-36 2xl:h-40">
                    {/* TODO: Breadcrumb content goes here */}
                </div>
                <Component {...pageProps} />
                <Footer className="mt-12 md:mt-20 sm:mb-12 md:mb-24 lg:mb-28 xl:mb-36 2xl:mb-40" />
            </div>
        </div>
        <PageLoading isLoading={isShowingLoadingIndicator} />
    </SiteContextProvider>;
}
