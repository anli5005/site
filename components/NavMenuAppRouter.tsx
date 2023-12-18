"use client";

import { usePathname } from "next/navigation";
import { NavMenuCommon } from "./NavMenuCommon";

export function NavMenuAppRouter() {
    const pathname = usePathname();
    return <NavMenuCommon pathname={pathname} />;
}