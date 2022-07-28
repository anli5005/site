import { useTopLevelBreadcrumbConfiguration } from "components/Breadcrumbs";
import { PageTitle } from "components/PageTitle";
import PostContent from "components/PostContent";
import { getAPI } from "lib/api";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { NextSeo } from "next-seo";

interface DynamicPageProps {
    title: string;
    content: string;
}

export default function DynamicPage({ title, content }: DynamicPageProps) {
    useTopLevelBreadcrumbConfiguration();
    
    return <div>
        <NextSeo title={title} openGraph={{
            title,
        }} />
        <PageTitle bgClip={true} className="bg-gradient-to-br from-grape-400 to-grape-800 dark:from-grape-300 dark:to-grape-600">
            {title}
        </PageTitle>
        <main className="md:mt-4 prose">
            <PostContent html={content} />
        </main>
    </div>;
}

export async function getStaticProps(ctx: GetStaticPropsContext<{ page: string }>): Promise<GetStaticPropsResult<DynamicPageProps>> {
    const revalidate = 60;
    
    if (!ctx.params) return { notFound: true };
    
    const api = getAPI();
    const pages = await api.pages().param("_fields", [ "title", "content" ]).slug(ctx.params.page);
    
    if (pages.length === 0) return { notFound: true, revalidate };
    
    return {
        props: {
            title: pages[0].title.rendered,
            content: pages[0].content.rendered,
        },
        revalidate,
    };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
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