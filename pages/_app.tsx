import 'styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { SiteContextProvider } from 'lib/SiteContext';

export default function App({ Component, pageProps }: AppProps) {
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
            </div>
        </div>
    </SiteContextProvider>;
}
