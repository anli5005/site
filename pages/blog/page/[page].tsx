import { getProps, PagedContent, PagedContentProps } from "components/PagedContent";
import { PageTitle } from "components/PageTitle";
import { Parser } from "html-to-react";
import { getAPI } from "lib/api";
import { formatISODate } from "lib/dates";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

const parser = new Parser();

function PostExcerpt({ html }: { html: string }) {
    const tree = parser.parse(html);
    return <div className="italic text-sm text-slate-500 dark:text-slate-400 group-hover:opacity-90 transition-opacity">
        {tree}
    </div>
}

export default function BlogPage({ ...pagedContentProps }: PagedContentProps<any>) {
    return <>
        <NextSeo title="Blog" />
        <PageTitle bgClip={true} className="bg-gradient-to-br from-sage-500 to-sage-600 dark:from-sage-400 dark:to-sage-500">
            Blog
        </PageTitle>
        <p className="mb-8">Musings on various topics and whatnot.</p>
        <PagedContent {...pagedContentProps} getPagePath={page => {
            if (page === 1) return { href: "/blog" };
            return {
                href: "/blog/page/[page]",
                as: `/blog/page/${page}`,
            };
        }}>
            {posts => posts.map(post => <article className="first-of-type:mt-8 mb-8" key={post.id}>
                <Link href="/blog/[id]/[slug]" as={`/blog/${post.id}/${encodeURIComponent(post.slug)}`}>
                    <a className="group">
                        <div className="font-sans text-lg group-hover:opacity-90 transition-opacity">{formatISODate(post.isoDate)}</div>
                        <h4 className="font-sans font-bold text-2xl mb-1 underline text-sage-600 dark:text-sage-400 decoration-sage-600/50 dark:decoration-sage-400/50 group-hover:decoration-sage-500 group-hover:text-sage-500 transition-colors">{post.title}</h4>
                        <PostExcerpt html={post.excerpt} />
                    </a>
                </Link>
            </article>)}
        </PagedContent>
    </>;
}

export async function getBlogProps(page: number) {
    const api = getAPI();
    return await getProps(page, async page => {
        try {
            const posts = await api.posts().page(page).param("_fields", [
                "id",
                "date_gmt",
                "slug",
                "title",
                "excerpt",
            ]);
            return posts;
        } catch (e: any) {
            if (e.code === "rest_post_invalid_page_number") return [];
            throw e;
        }
    }, post => {
        return {
            id: post.id,
            slug: post.slug,
            title: post.title.rendered,
            isoDate: post.date_gmt,
            excerpt: post.excerpt.rendered,
        };
    });
}

export async function getServerSideProps(ctx: GetStaticPropsContext<{ page: string }>) {
    if (!ctx.params) {
        return { notFound: true };
    } 

    if (!/^[1-9][0-9]*$/.test(ctx.params.page)) {
        return { notFound: true };
    }

    const page = parseInt(ctx.params.page);
    
    const result = await getBlogProps(page);
    if ("notFound" in result) {
        return { notFound: true };
    } else {
        return result;
    }
}