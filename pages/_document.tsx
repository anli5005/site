import Document, { Html, Head, Main, NextScript } from "next/document";

class SiteDocument extends Document {
    render() {
        return <Html>
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/gmf2sso.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>;
    }
}

export default SiteDocument;