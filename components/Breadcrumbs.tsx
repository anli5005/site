import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { faHome } from "@fortawesome/pro-regular-svg-icons";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSiteContext } from "lib/SiteContext";
import Link from "next/link";
import { useEffect } from "react";

export interface BreadcrumbItem {
    href: string;
    as?: string;
    title: string;
    icon?: IconDefinition;
}

export const homeBreadcrumbItem: BreadcrumbItem = {
    title: "Home",
    icon: faHome,
    href: "/",
};

export interface BreadcrumbConfiguration {
    items: BreadcrumbItem[];
    trailing: boolean;
}

export function useBreadcrumbConfiguration(config: BreadcrumbConfiguration) {
    const siteContext = useSiteContext();
    useEffect(() => {
        siteContext.setBreadcrumbConfiguration(config);
    }, []);
}

export function useTopLevelBreadcrumbConfiguration() {
    useBreadcrumbConfiguration({
        items: [ homeBreadcrumbItem ],
        trailing: true,
    });
}

export function Breadcrumbs() {
    const { breadcrumbConfiguration } = useSiteContext();
    const items: ({
        separator: false,
    } & BreadcrumbItem | {
        separator: true,
    })[] = [];

    breadcrumbConfiguration.items.forEach((item, index) => {
        items.push({
            ...item,
            separator: false,
        });

        if (index !== breadcrumbConfiguration.items.length - 1) {
            items.push({
                separator: true,
            });
        }
    });

    if (breadcrumbConfiguration.trailing) items.push({
        separator: true,
    });

    return <div className="sm:text-lg space-x-2">
        {items.map((item, index) => {
            if (item.separator) {
                return <FontAwesomeIcon key={index} className="text-slate-400 dark:text-slate-500" icon={faChevronRight} />;
            } else {
                return <Link key={index} href={item.href} as={item.as} className="link">
                    {item.icon && <FontAwesomeIcon icon={item.icon} className="mr-2" />}{item.title}
                </Link>
            }
        })}
    </div>;
}