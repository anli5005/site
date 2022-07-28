import Document, { Html, Head, Main, NextScript } from "next/document";

class SiteDocument extends Document {
    render() {
        return <Html>
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/gmf2sso.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" />
                <link rel="shortcut icon" href="/favicon.ico" />
                
                {/* @ts-ignore */}
                <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />

                {/* @ts-ignore */}
                <meta name="theme-color" media="(prefers-color-scheme: dark) and (prefers-contrast: more)" content="#000000" />

                {/* @ts-ignore */}
                <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a1224" />

                <meta name="theme-color" content="#096de3" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>;
    }
}

export default SiteDocument;