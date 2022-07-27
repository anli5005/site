import { faCube } from "@fortawesome/pro-regular-svg-icons";
import classNames from "classnames";
import { useBreadcrumbConfiguration } from "components/Breadcrumbs";
import { PageTitle } from "components/PageTitle";
import PostContent from "components/PostContent";
import { ProjectLink } from "components/ProjectLink";
import { getAPI } from "lib/api";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { NextSeo } from "next-seo";
import { readableColor, transparentize } from "polished";
import { decode } from "he";
import { TagList } from "components/TagList";

interface DynamicProjectProps {
    title: string;
    content: string;
    year?: string;
    shortDescription?: string;
    tags: { id: number, name: string }[];
    bg?: string;
    fg?: string;
    url: string;
    domain?: string;
    image?: string;
}

export default function DynamicProject({ title, content, year, shortDescription, tags, bg, fg, url, domain, image }: DynamicProjectProps) {
    useBreadcrumbConfiguration({
        items: [
            {
                href: "/projects",
                icon: faCube,
                title: "Portfolio",
            }
        ],
        trailing: true,
    });

    const showAdditionalDetails = shortDescription || url;
    const showTitleInBox = bg || image;
    const actualBG = bg ?? "black";
    const actualFG = bg && (fg ?? readableColor(bg));

    return <div>
        <NextSeo title={title} />
        <div className={classNames(
            "mb-8",
            showTitleInBox && "w-full rounded-lg pt-32 px-4 pb-4 sm:px-6 sm:pb-6 bg-cover bg-center",
            image ? "pt-32" : "pt-6 sm:pt-8",
        )} style={{
            backgroundImage: image && `linear-gradient(to bottom, ${transparentize(0.4, actualBG)}, ${transparentize(0, actualBG)}), url("${image}")`,
            backgroundColor: actualBG,
            color: actualFG,
        }}>
            <PageTitle bgClip={!showTitleInBox} className={showTitleInBox ? "" : "bg-gradient-to-br from-ocean-400 to-ocean-700 dark:from-ocean-300 dark:to-ocean-500"}>
                {title}
                {year && <small className="ml-2 sm:ml-3 md:ml-4 sm:text-2xl md:text-4xl">{year}</small>}
            </PageTitle>
            {showAdditionalDetails && <div>
                {shortDescription && <p className="leading-relaxed sm:text-lg">{shortDescription}</p>}
                {url && <div className="mt-4">
                    <ProjectLink className="px-4 py-3 rounded inline-block" {...{
                        bg,
                        fg,
                        url,
                        domain,
                    }} swap={!!showTitleInBox} />
                </div>}
            </div>}
        </div>
        {tags.length > 0 && <TagList className="mb-8 gap-2" tags={tags} />}
        <main className="prose">
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
        "short_description",
        "project_url",
        "project_domain",
        "brand_bg",
        "brand_fg",
        "_links",
        "_embed",
    ]).param("_embed", [
        "wp:featuredmedia",
        "wp:term",
    ]).slug(ctx.params.slug);

    if (projects.length === 0) return { notFound: true, revalidate };
    const project = projects[0];

    let imageURL;
    if (project._embedded?.["wp:featuredmedia"]?.length > 0) {
        imageURL = project._embedded["wp:featuredmedia"][0].source_url;
    }

    return {
        props: {
            title: project.title.rendered,
            content: project.content.rendered,
            year: project.year,
            shortDescription: project.short_description,
            tags: project._embedded?.["wp:term"][0].map(({ id, name }: { id: number, name: string }) => ({
                id,
                name: decode(name),
            })) ?? [],
            url: project.project_url || null,
            domain: project.project_domain || null,
            bg: project.brand_bg || null,
            fg: project.brand_fg || null,
            image: imageURL || null,
        },
        revalidate,
    };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const api = getAPI();
    const projects: { slug: string }[] = await api.projects().perPage(12).param("_fields", "slug");

    return {
        paths: projects.map(project => ({
            params: { slug: project.slug },
        })),
        fallback: "blocking",
    };
}