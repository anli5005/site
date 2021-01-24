import 'scss/main.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import theme from '../theme';
import { DefaultSeo } from 'next-seo';

Router.events.on("routeChangeStart", () => NProgress.start());
["routeChangeComplete", "routeChangeError"].forEach(event => Router.events.on(event, () => NProgress.done()));

const GlobalStyle = createGlobalStyle`
:root {
${({theme: {colors: {light, names}}}) => names.map(([key, value]) => {
    return `--${value}: ${light[key]};\n`;
}).join("\n")}}
}

@media (prefers-color-scheme: dark) {
:root {
${({theme: {colors: {dark, names}}}) => names.map(([key, value]) => {
    return `--${value}: ${dark[key]};\n`;
}).join("\n")}}
}

.dark-invert {
    filter: invert(1) hue-rotate(180deg);
}
}

.syntax-highlighted-code {
    border-radius: 0.25rem;
}
`;

export default function App({Component, pageProps}) {
    return <ThemeProvider theme={theme}>
        <DefaultSeo
            openGraph={{
                type: "website",
                locale: "en_US",
                site_name: "Anthony Li (anli)"
            }}
            twitter={{
                site: "@anli5005",
                cardType: "summary"
            }}
        />
        <GlobalStyle />
        <Component {...pageProps} />
    </ThemeProvider>;
}