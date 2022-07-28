import classNames from "classnames";
import { PropsWithChildren } from "react";

export function PageTitle({ className, bgClip = false, children }: PropsWithChildren<{ className?: string, bgClip?: boolean }>) {
    return <h1 className={
        classNames(
            "-mt-2 text-3xl sm:text-4xl md:text-6xl pb-2 md:pb-4 font-sans font-bold",
            bgClip && "bg-clip-text text-transparent w-fit",
            className,
        )
    }>{children}</h1>
}