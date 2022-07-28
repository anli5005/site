import { faCube, faEllipsisH, faNewspaper, IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

function NavbarItem({ children, ...props }: PropsWithChildren<LinkProps>) {
    return <Link {...props}>
        <a className="group w-full h-full sm:h-auto flex flex-col items-center justify-center relative">
            {children}
        </a>
    </Link>
}

function NavbarTooltip({ activeClassName, active, children, responsiveMode }: PropsWithChildren<{ activeClassName?: string, active: boolean, responsiveMode: "hide" | "show" }>) {
    return <span className={
        classNames(
            responsiveMode === "show" ? "block text-xs sm:text-base text-center w-full sm:w-auto" : "hidden",
            "sm:inline-block sm:absolute z-30 left-full top-1/2 sm:-translate-y-1/2 sm:ml-3 sm:rounded-full sm:backdrop-blur sm:px-2 sm:py-1",
            "sm:shadow sm:transition-all sm:opacity-0 sm:-translate-x-2 sm:group-hover:translate-x-0 sm:group-focus:translate-x-0 sm:group-hover:opacity-100 sm:group-focus:opacity-100",
            !active && "sm:bg-ocean-200/50 sm:dark:bg-ocean-900/50",
            active && activeClassName,
        )
    }>
        {children}
    </span>;
}

function NavbarIcon({ className, activeClassName, activeTooltipClassName, active = false, icon, title, sizing = "sm:py-2", ...props }: LinkProps & {
    className?: string,
    activeClassName?: string,
    activeTooltipClassName?: string,
    active?: boolean,
    icon: IconDefinition,
    title: string,
    sizing?: string,
}) {
    return <NavbarItem {...props}>
        <span className={
            classNames(
                "text-2xl sm:text-2xl rounded-full w-10 h-8 flex-shrink-0 sm:w-12 sm:h-12 flex justify-center items-center transition-all",
                !active && "text-ocean-900 dark:text-ocean-200",
                !active && "group-hover:bg-ocean-900 group-active:bg-ocean-1000 group-hover:text-ocean-50 group-active:text-ocean-50",
                !active && "dark:group-hover:bg-ocean-200 dark:group-active:bg-ocean-300 dark:group-hover:text-ocean-950 dark:group-active:text-ocean-950",
                sizing,
                className,
                active && activeClassName,
            )
        }>
            <FontAwesomeIcon icon={icon} />
        </span>
        <span className="sr-only">{title}</span>
        <NavbarTooltip {...{active}} activeClassName={activeTooltipClassName} responsiveMode="show">{title}</NavbarTooltip>
    </NavbarItem>
}

export function NavMenu() {
    const router = useRouter();

    return <nav className={classNames(
        "h-16 sm:h-fit sm:w-14 sm:mr-6 md:mr-8 flex-shrink-0 sm:sticky top-4 lg:top-8 sm:mt-20 lg:mt-24 xl:mt-28 2xl:mt-32",
        "bg-ocean-100 dark:bg-ocean-900",
        "p-2 flex",
        "sm:p-0 sm:shadow sm:dark:shadow-lg sm:rounded-full sm:flex-col",
        "contrast-more:border-black dark:contrast-more:border-white contrast-more:border-2 contrast-more:shadow-none contrast-more:bg-white dark:contrast-more:bg-black"
    )}>
        <NavbarItem href="/">
            <img src="/images/logo.png" className="block rounded-full sm:w-full h-full sm:h-auto transition-opacity group-hover:opacity-80 group-active:opacity-60" alt="Anthony Li (anli5005) - Home" />
            <span className="sr-only">Anthony Li (anli5005) - Home</span>
            <NavbarTooltip responsiveMode="hide" activeClassName="bg-gradient-to-br from-sage-500 via-ocean-500 to-grape-600 text-white" active={router.pathname === "/"}>Home</NavbarTooltip>
        </NavbarItem>
        <NavbarIcon
            sizing="sm:mt-1"
            href="/blog"
            icon={faNewspaper}
            title="Blog"
            active={router.pathname === "/blog"}
            activeClassName="bg-sage-600 text-white"
            activeTooltipClassName="sm:bg-sage-600 sm:text-white" />
        <NavbarIcon
            href="/projects"
            icon={faCube}
            title="Portfolio"
            active={router.pathname === "/projects"}
            activeClassName="bg-ocean-400 text-white"
            activeTooltipClassName="sm:bg-ocean-400 sm:text-white" />
        <NavbarIcon
            sizing="sm:mb-1"
            href="/[page]"
            as="/misc"
            icon={faEllipsisH}
            title="Misc"
            active={router.pathname === "/[page]" && router.query.page === "misc"}
            activeClassName="bg-grape-400 text-white"
            activeTooltipClassName="sm:bg-grape-400 sm:text-white" />
    </nav>;
}