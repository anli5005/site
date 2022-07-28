import { faArrowRight, faArrowUpRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { readableColor } from "polished";

export function ProjectLink({ className, bg, fg, url, title, newTab = false, swap = false }: {
    className?: string,
    bg?: string,
    fg?: string,
    url: string,
    title?: string,
    newTab?: boolean,
    swap?: boolean
}) {
    let text = "Go to project";
    if (title) {
        text = title;
    } else {
        try {
            const parsed = new URL(url);
            text = parsed.hostname;
        } catch (e) {}
    }

    const actualFG = bg && (fg ?? readableColor(bg));

    return <a href={url} {...(newTab ? {
        target: "_blank",
        rel: "noopener noreferrer"
    } : {})} className={classNames(
        !bg && "bg-ocean-500 text-white",
        "hover:opacity-80 active:opacity-60 transition-opacity",
        className,
    )} style={{
        backgroundColor: swap ? actualFG : bg,
        color: swap ? bg : actualFG,
    }}>
        {text}
        <FontAwesomeIcon className="ml-2" icon={newTab ? faArrowUpRight : faArrowRight} />
    </a>
}