import { PageTitle } from "components/PageTitle";
import PostContent from "components/PostContent";
import { getAPI } from "lib/api";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";

interface DynamicProjectProps {
    title: string;
    content: string;
    year?: string;
}

export default function DynamicPage({ title, content, year }: DynamicProjectProps) {
    return <div>
        <PageTitle bgClip={true} className="bg-gradient-to-br from-ocean-400 to-ocean-700 dark:from-ocean-300 dark:to-ocean-500">
            {title}
            {year && <small className="ml-2 sm:ml-3 md:ml-4 sm:text-2xl md:text-4xl">{year}</small>}
        </PageTitle>
        <main className="md:mt-4 prose">
            <PostContent html={content} />
        </main>
    </div>;
}

export async function getStaticProps(ctx: GetStaticPropsContext<{ slug: string }>): Promise<GetStaticPropsResult<DynamicProjectProps>> {
    const revalidate = 60;

    if (!ctx.params) return { notFound: true };

    const api = getAPI();
    const projects = await api.projects().param("_fields", [
        "title",
        "content",
        "year",
    ]).slug(ctx.params.slug);

    if (projects.length === 0) return { notFound: true, revalidate };
    const project = projects[0];

    return {
        props: {
            title: project.title.rendered,
            content: project.content.rendered,
            year: project.year,
        },
        revalidate,
    };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const api = getAPI();
    const projects: { slug: string }[] = await api.projects().perPage(10).param("_fields", "slug");

    return {
        paths: projects.map(project => ({
            params: { slug: project.slug },
        })),
        fallback: "blocking",
    };
}