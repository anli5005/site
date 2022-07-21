import PostContent from "components/PostContent";
import { getAPI } from "lib/api";
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";

interface DynamicPageProps {
    title: string;
    content: string;
}

export default function DynamicPage({ title, content }: DynamicPageProps) {
    return <div>
        <h1>{title}</h1>
        <PostContent html={content} />
    </div>;
}

export async function getStaticProps(ctx: GetStaticPropsContext<{ page: string }>): Promise<GetStaticPropsResult<DynamicPageProps>> {
    if (!ctx.params) return { notFound: true };
    
    const api = getAPI();
    const pages = await api.pages().param("_fields", [ "title", "content" ]).slug(ctx.params.page);
    
    if (pages.length === 0) return { notFound: true };
    
    return {
        props: {
            title: pages[0].title.rendered,
            content: pages[0].content.rendered,
        },
        revalidate: 60,
    };
}

export async function getStaticPaths(ctx: GetStaticPathsContext): Promise<GetStaticPathsResult> {
    const api = getAPI();

    let current = api.pages().perPage(100).param("_fields", "slug");
    let pages = [];
    while (current) {
        const currentPages = await current;
        pages.push(...currentPages);
        current = currentPages._paging.next;
    }

    return {
        paths: pages.map(page => ({
            params: { page: page.slug },
        })),
        fallback: "blocking",
    };
}