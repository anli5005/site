import { faCalendar, faNewspaper } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBreadcrumbConfiguration } from "components/Breadcrumbs";
import { PageTitle } from "components/PageTitle";
import PostContent from "components/PostContent";
import { getAPI } from "lib/api";
import { formatISODate } from "lib/dates";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";

interface DynamicPostProps {
    title: string;
    isoDate: string;
    content: string;
}

export default function DynamicPage({ title, isoDate, content }: DynamicPostProps) {
    useBreadcrumbConfiguration({
        items: [
            {
                href: "/blog",
                icon: faNewspaper,
                title: "Blog",
            }
        ],
        trailing: true,
    });

    return <div>
        <PageTitle bgClip={true} className="bg-gradient-to-br from-sage-500 to-sage-600 dark:from-sage-400 dark:to-sage-500">
            {title}
        </PageTitle>
        <div className="pb-4 text-lg md:text-xl font-sans font-bold text-slate-700 dark:text-slate-300">
            <div className="uppercase">
                <FontAwesomeIcon className="mr-2" icon={faCalendar} />
                {formatISODate(isoDate)}
            </div>
        </div>
        <main className="md:mt-4 prose">
            <PostContent html={content} />
        </main>
    </div>;
}

export async function getStaticProps(ctx: GetStaticPropsContext<{ id: string, slug: string }>): Promise<GetStaticPropsResult<DynamicPostProps>> {
    const revalidate = 60;

    if (!ctx.params) return { notFound: true };

    if (!/^[1-9][0-9]*$/.test(ctx.params.id)) {
        return { notFound: true };
    }

    const id = parseInt(ctx.params.id);
    if (Number.isNaN(id) || id < 1) {
        return { notFound: true };
    }

    const api = getAPI();
    let post: any;
    try {
        post = await api.posts().param("_fields", [
            "title",
            "slug",
            "content",
            "date_gmt",
        ]).id(id);
    } catch (e: any) {
        if (e.code === "rest_post_invalid_id") {
            return { notFound: true, revalidate };
        } else {
            throw e;
        }
    }

    if (post.slug !== ctx.params.slug) return { notFound: true, revalidate };

    return {
        props: {
            title: post.title.rendered,
            isoDate: post.date_gmt,
            content: post.content.rendered,
        },
        revalidate,
    };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const api = getAPI();

    const posts: any[] = await api.posts().param("_fields", [ "id", "slug" ]);

    return {
        paths: posts.map(post => ({
            params: { id: post.id.toString(), slug: post.slug },
        })),
        fallback: "blocking",
    };
}