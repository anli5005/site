import { useEffect, useState } from "react";

export function useMediaQuery(query: string, defaultResult = false) {
    const [isMatched, setMatched] = useState((typeof window !== "undefined" && window.matchMedia) ? window.matchMedia(query).matches : defaultResult);
    
    useEffect(() => {
        if (typeof window !== "undefined" && (window as { matchMedia?: Window["matchMedia"] }).matchMedia) {
            const listener = (event: MediaQueryListEvent) => {
                setMatched(event.matches);
            };

            const watcher = window.matchMedia(query);
            watcher.addEventListener("change", listener);
            setMatched(watcher.matches);
            return () => watcher.removeEventListener("change", listener);
        }
    }, [query]);
    
    return isMatched;
}

function createMediaQueryHook(query: string, defaultResult = false) {
    return () => useMediaQuery(query, defaultResult);
}

export const useLightMode = createMediaQueryHook("(prefers-color-scheme: light)");
export const useReducedMotion = createMediaQueryHook("(prefers-reduced-motion)");