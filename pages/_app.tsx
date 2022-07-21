import 'styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return <>
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
        <Component {...pageProps} />
    </>;
}
