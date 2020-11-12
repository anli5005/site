import Router from 'next/router';

export default function PostContent({html}) {
   return <div className="page-content" dangerouslySetInnerHTML={{__html: html}} onClick={(e) => {
        const link = e.target.closest(".page-content a");
        if (link) {
            if (link.host === location.host) {
                const segments = link.pathname.split("/").slice(1) || [""];
                if (segments[segments.length - 1] === "") {
                    segments.pop();
                }

                let href;
                
                if (segments.length === 0) {
                    href = "/";
                } else if (segments[0] === "blog") {
                    href = "/blog";
                } else if (segments[0] === "projects" && segments.length === 1) {
                    href = "/projects";
                } else if (segments[0] === "more" && segments.length === 1) {
                    href = "/more";
                } else if (segments.length === 1) {
                    href = "/[page]";
                }

                if (href) {
                    e.preventDefault();
                    Router.push(href + (link.query || "") + (link.hash || ""), (link.pathname || "/") + (link.query || "") + (link.hash || ""));
                }
            }
        }
    }} />;
}