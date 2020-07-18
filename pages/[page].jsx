import Page from 'components/Page';
import Error from 'next/error';
import Router from 'next/router';

import { stringify } from 'querystring';

export default function PagePage({title, errorCode, content}) {
    if (errorCode) return <Error statusCode={errorCode} />;

    const html = content;

    return <Page>
        <h1>{title}</h1>
        <div className="page-content" dangerouslySetInnerHTML={{__html: html}} onClick={(e) => {
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
                    } else if (segments.length === 1) {
                        href = "/[page]";
                    }

                    if (href) {
                        e.preventDefault();
                        Router.push(href + (link.query || "") + (link.hash || ""), (link.pathname || "/") + (link.query || "") + (link.hash || ""));
                    }
                }
            }
        }} />
    </Page>;
}

export async function getServerSideProps({params: {page}, res}) {
    const query = {
        slug: page,
        _fields: "title,content,meta,featured_media"
    };

    const url = "https://wp.anli.dev/wp-json/wp/v2/pages?" + stringify(query);

    const data = await (await fetch(url)).json();

    if (data.length === 0) {
        res.statusCode = 404;
        return {props: {errorCode: 404}}
    }

    return {props: {
        title: data[0].title.rendered,
        content: data[0].content.rendered
    }};
} 