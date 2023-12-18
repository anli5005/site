"use client";

import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

export interface AppContext {
    isLoading: boolean;
    setLoading(isLoading: boolean): void;
}

const context = createContext<AppContext | null>(null);

export function useAppContext(): AppContext {
    const appContext = useContext(context);
    if (!appContext) throw new Error("App context not found");
    return appContext;
}

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [isLoading, setLoading] = useState(false);

    const value: AppContext = {
        isLoading,
        setLoading,
    };

    const Provider = context.Provider;
    return <Provider value={value}>
        {children}
    </Provider>;
}