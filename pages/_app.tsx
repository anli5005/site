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
import { AnimatePresence, motion } from 'framer-motion';
import { NavMenu } from 'components/NavMenu';
import { useReducedMotion } from 'lib/mediaQueries';
import { BreadcrumbConfiguration, Breadcrumbs } from 'components/Breadcrumbs';

const loadingIndicatorDelay = 200;

export default function App({ Component, pageProps }: AppProps) {
    const [isLoading, setLoading] = useState(false);
    const [isShowingLoadingIndicator, setShowingLoadingIndicator] = useState(false);
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

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

    const initialBreadcrumbs: BreadcrumbConfiguration = {
        items: [],
        trailing: false,
    };
    const [breadcrumbConfiguration, setBreadcrumbConfiguration] = useState(initialBreadcrumbs);
    const siteContext = {
        breadcrumbConfiguration,
        setBreadcrumbConfiguration,
    };

    return <SiteContextProvider value={siteContext}>
        <DefaultSeo
            titleTemplate="%s • Anthony Li"
            defaultTitle="Anthony Li"
            openGraph={{
                type: "website",
                locale: "en_US",
                site_name: "Anthony Li (anli5005)",
                images: [
                    {
                        url: "https://anli.dev/images/logo-circle.png",
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
            <NavMenu />
            <div className="flex-grow p-4 sm:p-0">
                <AnimatePresence initial={false} mode="wait" onExitComplete={() => setBreadcrumbConfiguration(initialBreadcrumbs)}>
                    <motion.div
                        key={router.asPath.split("?")[0]}
                        initial={{
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : -16,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.25,
                                ease: "easeOut",
                            },
                        }}
                        exit={{
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : 16,
                            transition: {
                                duration: 0.25,
                                ease: "easeIn",
                            },
                        }}
                    >
                        <div className="sm:pt-4 pb-4 sm:h-20 lg:h-24 xl:h-28 2xl:h-32 flex flex-col justify-end" >
                            <Breadcrumbs />
                        </div>
                        <Component {...pageProps} />
                        <Footer className="mt-12 md:mt-20 sm:mb-12 md:mb-24 lg:mb-28 xl:mb-36 2xl:mb-40" />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
        <PageLoading isLoading={isShowingLoadingIndicator} />
    </SiteContextProvider>;
}
