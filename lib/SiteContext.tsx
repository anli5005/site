import { BreadcrumbConfiguration } from "components/Breadcrumbs";
import { PropsWithChildren, useContext } from "react";
import { createContext } from "react";

export interface SiteContext {
    breadcrumbConfiguration: BreadcrumbConfiguration;
    setBreadcrumbConfiguration(breadcrumbs: BreadcrumbConfiguration): void;
}

const context = createContext<SiteContext | null>(null);

export function useSiteContext(): SiteContext {
    const siteContext = useContext(context);
    if (!siteContext) throw new Error("Site context not found");
    return siteContext;
}

export function SiteContextProvider({ value, children }: PropsWithChildren<{ value: SiteContext }>) {
    const Provider = context.Provider;
    return <Provider value={value}>
        {children}
    </Provider>;
}