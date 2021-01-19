import Router from 'next/router';

export default function PostContent({html}) {
   return <div className="page-content" dangerouslySetInnerHTML={{__html: html}} onClick={(e) => {
        const link = e.target.closest(".page-content a");
        if (link) {
            if (link.host === location.host) {
                e.preventDefault();
                Router.push((link.pathname || "/") + (link.query || "") + (link.hash || ""));
            }
        }
    }} />;
}