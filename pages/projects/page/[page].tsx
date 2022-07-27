import { faArrowRight, faInfoCircle } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProps, PagedContent, PagedContentProps } from "components/PagedContent";
import { PageTitle } from "components/PageTitle";
import { ProjectLink } from "components/ProjectLink";
import { TagList } from "components/TagList";
import { decode } from "he";
import { getAPI } from "lib/api";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { getLuminance, readableColor, transparentize } from "polished";
import { useMemo } from "react";

function Project({ project }: {
    project: {
        slug: string,
        title: string,
        year?: string,
        shortDescription?: string,
        bg?: string,
        fg?: string,
        url: string,
        domain?: string,
        image?: string,
        tags: { id: number, name: string }[]
    },
}) {
    const as = `/projects/${encodeURIComponent(project.slug)}`;
    const bg = project.bg ?? (project.image && "black");
    const fg = bg && readableColor(bg);
    let borderClass = "border-black/50 dark:border-white/50";
    if (fg && getLuminance(fg) > 0.5) {
        borderClass = "border-white/50";
    } else if (fg) {
        borderClass = "border-black/50";
    }

    return <article className="flex flex-col">
        <Link href="/projects/[slug]" as={as}>
            <a className="block border border-slate-400 dark:border-slate-600 p-3 flex-grow hover:opacity-80 active:opacity-60 transition-opacity rounded-t-lg bg-cover bg-center" style={{
                backgroundColor: project.bg,
                backgroundImage: project.image && `linear-gradient(to bottom, ${transparentize(0.2, bg!)}, ${transparentize(0.2, bg!)}), url("${project.image}")`,
                color: fg,
            }}>
                <h4 className="font-sans font-bold text-2xl sm:text-3xl">{project.title}{project.year && <small className="ml-2 font-normal">{project.year}</small>}</h4>
                {project.shortDescription && <p className="text-sm mt-2 italic">{project.shortDescription}</p>}
                {project.tags.length > 0 && <TagList className="mt-3 gap-1" tagAppearance={`border ${borderClass}`} tags={project.tags} />}
            </a>
        </Link>
        <div className="flex items-center justify-center p-4 space-x-4 border-x border-b border-slate-400 dark:border-slate-600 rounded-b-lg">
            {project.url && <ProjectLink {...{
                url: project.url,
                domain: project.domain,
                bg: project.bg,
                fg: project.fg,
            }} className="px-3 py-1 rounded-full border border-black/20 dark:border-white/20" newTab />}
            <Link href="/projects/[slug]" as={as}>
                <a className="link">
                    <FontAwesomeIcon className="text-xl align-middle" icon={faInfoCircle} />
                    <span className={project.url ? "sr-only" : "ml-2"}>View details<FontAwesomeIcon className="ml-2" icon={faArrowRight} /></span>
                </a>
            </Link>
        </div>
    </article>;
}

export default function ProjectsPage({ tags, ...pagedContentProps }: PagedContentProps<any> & { tags: { id: number, name: string }[] }) {
    const tagMap = useMemo(() => {
        const map = new Map<number, { id: number, name: string }>();
        tags.forEach(tag => map.set(tag.id, tag));
        return map;
    }, [tags]);

    return <>
        <NextSeo title="Portfolio" />
        <PageTitle bgClip={true} className="bg-gradient-to-br from-ocean-400 to-ocean-700 dark:from-ocean-300 dark:to-ocean-500">
            Portfolio
        </PageTitle>
        <p className="mb-8">I've made many things. Here are some of them.</p>
        <PagedContent {...pagedContentProps} getPagePath={page => {
            if (page === 1) return { href: "/projects" };
            return {
                href: "/projects/page/[page]",
                as: `/projects/page/${page}`,
            };
        }}>
            {projects => <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                {projects.map(project => <Project project={{
                    ...project,
                    tags: project.tags.map((tagID: number) => tagMap.get(tagID)).filter((tag: { id: number, name: string } | undefined) => tag),
                }} key={project.id} />)}
            </div>}
        </PagedContent>
    </>;
}

export async function getProjectsProps(page: number) {
    const api = getAPI();
    const result = await getProps(page, async page => {
        try {
            const projects = await api.projects().perPage(12).page(page).param("_fields", [
                "id",
                "slug",
                "title",
                "year",
                "short_description",
                "project_url",
                "project_domain",
                "brand_bg",
                "brand_fg",
                "tags",
                "_links",
                "_embed",
            ]).param("_embed", [
                "wp:featuredmedia",
            ]);
            return projects;
        } catch (e: any) {
            if (e.code === "rest_post_invalid_page_number") return [];
            throw e;
        }
    }, project => {
        let imageURL;
        if (project._embedded?.["wp:featuredmedia"]?.length > 0) {
            imageURL = project._embedded["wp:featuredmedia"][0].source_url;
        }

        return {
            id: project.id,
            slug: project.slug,
            title: project.title.rendered,
            year: project.year,
            shortDescription: project.short_description,
            url: project.project_url || null,
            domain: project.project_domain || null,
            bg: project.brand_bg || null,
            fg: project.brand_fg || null,
            image: imageURL || null,
            tags: project.tags,
        };
    });

    if ("props" in result) {
        let tags = [];
        let current = api.tags().perPage(100).param("_fields", ["id", "name"]);
        while (current) {
            const tagsResult = await current;
            tags.push(...tagsResult.map((tag: { id: number, name: string }) => ({
                id: tag.id,
                name: decode(tag.name),
            })));
            current = tagsResult._paging.next;
        }
        return {
            props: {
                ...result.props,
                tags,
            },
        };
    } else {
        return result;
    }
}

export async function getServerSideProps(ctx: GetStaticPropsContext<{ page: string }>) {
    if (!ctx.params) {
        return { notFound: true };
    }

    if (!/^[1-9][0-9]*$/.test(ctx.params.page)) {
        return { notFound: true };
    }

    const page = parseInt(ctx.params.page);

    const result = await getProjectsProps(page);
    if ("notFound" in result) {
        return { notFound: true };
    } else {
        return result;
    }
}