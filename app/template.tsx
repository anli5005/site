import { Footer } from "components/Footer";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
    return <>
        <div className="sm:pt-4 pb-4 sm:h-20 lg:h-24 xl:h-28 2xl:h-32 flex flex-col justify-end" />
        {children}
        <Footer className="mt-12 md:mt-20 sm:mb-12 md:mb-24 lg:mb-28 xl:mb-36 2xl:mb-40" />
    </>;
}