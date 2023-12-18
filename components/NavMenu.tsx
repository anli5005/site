import { useRouter } from "next/router";
import { NavMenuCommon } from "./NavMenuCommon";

export function NavMenu() {
    let { pathname, query } = useRouter();
    if (pathname === "/[page]" && query.page === "misc") {
        pathname = "/misc";
    }

    return <NavMenuCommon pathname={pathname} />;
}