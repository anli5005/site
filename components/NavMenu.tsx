import { faCube, faEllipsisH, faNewspaper, IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

function NavbarItem({ children, ...props }: PropsWithChildren<LinkProps>) {
    return <Link {...props}>
        <a className="group w-full h-full sm:h-auto flex items-center justify-center">
            {children}
        </a>
    </Link>
}

function NavbarIcon({ className, icon, title, sizing = "sm:py-2", ...props }: LinkProps & { className?: string, icon: IconDefinition, title: string, sizing?: string }) {
    return <NavbarItem {...props}>
        <FontAwesomeIcon className={
            classNames("text-3xl sm:text-2xl text-ocean-1000/60 dark:text-ocean-200/60 transition-colors", sizing, className)
        } icon={icon} />
    </NavbarItem>
}

export function NavMenu() {
    return <nav className={classNames(
        "h-14 sm:h-fit sm:w-14 sm:mr-6 md:mr-8 flex-shrink-0 sm:sticky top-4 lg:top-8 sm:mt-12 md:mt-24 lg:mt-28 xl:mt-36 2xl:mt-40",
        "bg-ocean-100 dark:bg-ocean-900",
        "p-2 flex",
        "sm:p-0 sm:shadow sm:dark:shadow-lg sm:rounded-full sm:flex-col"
    )}>
        <NavbarItem href="/">
            <img src="/images/logo.png" className="block rounded-full sm:w-full h-full sm:h-auto transition-opacity group-hover:opacity-80 group-active:opacity-60" />
        </NavbarItem>
        <NavbarIcon
            sizing="sm:pt-4 sm:pb-2"
            href="/blog"
            className="group-hover:text-sage-500 dark:group-hover:text-sage-400 group-focus:text-sage-500 dark:group-focus:text-sage-400"
            icon={faNewspaper}
            title="Blog" />
        <NavbarIcon
            href="/projects"
            className="group-hover:text-ocean-500 dark:group-hover:text-ocean-400 group-focus:text-ocean-500 dark:group-focus:text-ocean-400"
            icon={faCube}
            title="Portfolio" />
        <NavbarIcon
            sizing="sm:pt-2 sm:pb-4"
            href="/[page]"
            as="/misc"
            className="group-hover:text-grape-600 dark:group-hover:text-grape-400 group-focus:text-grape-600 dark:group-focus:text-grape-400"
            icon={faEllipsisH}
            title="Misc" />
    </nav>;
}