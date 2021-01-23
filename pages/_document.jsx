import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class SiteDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        // https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
            });

            const initialProps = await Document.getInitialProps(ctx);
            return {...initialProps, styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
            )};
        } finally {
            sheet.seal();
        }
    }

    render() {
        return <Html>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico?v=2" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    }
}