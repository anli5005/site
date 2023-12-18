import "styles/global.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { NavMenuAppRouter } from "components/NavMenuAppRouter";
import { AppContextProvider } from "components/AppContext";
import { PageLoadingIndicator } from "components/PageLoading";

export default function RootLayout({ children }: { children: ReactNode }) {
    return <html lang="en">
        <body>
            <AppContextProvider>
                <div className="sm:flex sm:container mx-auto sm:px-8 md:px-12 lg:px-16 xl:px-20">
                    <NavMenuAppRouter />
                    <div className="flex-grow p-4 sm:p-0">
                        {children}
                    </div>
                </div>
                <PageLoadingIndicator />
            </AppContextProvider>
        </body>
    </html>;
}

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
        { color: "#096de3" },
    ],
};

export const metadata: Metadata = {
    title: "Anthony Li",
    icons: {
        shortcut: "/favicon.ico",
        icon: "/favicon.ico",
    },
};