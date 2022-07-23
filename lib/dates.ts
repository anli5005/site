import { DateTime } from "luxon";

export function formatISODate(str: string) {
    return DateTime.fromISO(str, {
        zone: typeof window === "undefined" ? "America/New_York" : "local",
    }).toLocaleString({
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}