import PostContent from "components/PostContent";
import { getAPI } from "lib/api";
import { GetStaticPropsResult } from "next";
import { NextSeo } from "next-seo";
import homeProjects from "data/home-projects.json";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { readableColor, transparentize } from "polished";
import { formatISODate } from "lib/dates";

interface HomeProjectData {
    slug: string;
    title: string;
    bg?: string;
    image?: string;
    description: string;
}

interface HomeProps {
    introBlurb: string | null;
    projects: HomeProjectData[];
    posts: {
        id: number,
        slug: string,
        title: string,
        isoDate: string,
    }[];
    misc: string | null;
}

function HomeProject({ project }: { project: HomeProjectData }) {
    const bg = project.bg || (project.image && "black");
    const fg = bg && readableColor(bg);

    return <Link href="/projects/[slug]" as={`/projects/${encodeURIComponent(project.slug)}`}>
        <a className="p-3 sm:p-4 rounded-lg bg-ocean-500 text-white flex flex-col justify-end transition-opacity hover:opacity-80 active:opacity-60 group border border-black/20 dark:border-white/20 bg-cover bg-center" style={{
            backgroundColor: bg,
            color: fg,
            backgroundImage: project.image && `linear-gradient(to right, ${transparentize(0.1, bg!)}, ${transparentize(0.3, bg!)}), url("${project.image}")`
        }}>
            <h5 className="uppercase flex-grow mb-4 font-sans font-bold">{project.title}</h5>
            <p className="text-2xl font-sans font-bold">{project.description}</p>
            <div className="italic text-sm mt-1">More info<FontAwesomeIcon className="ml-2 transform group-hover:translate-x-1 transition-transform" icon={faArrowRight} /></div>
        </a>
    </Link>;
}

export default function Home({ introBlurb, projects, posts, misc }: HomeProps) {
    return <main>
        <NextSeo title="Anthony Li • anli5005 - Developer, Designer, Entrepreneur" titleTemplate="%s" />
        <h1 className="font-sans font-bold -mt-2 md:-mt-4 2xl:-mt-6 pb-4 sm:pb-8 bg-clip-text text-transparent w-fit bg-gradient-to-br from-sage-500 via-ocean-500 to-grape-600 dark:from-sage-400 dark:via-ocean-400 dark:to-grape-400">
            <div className="text-6xl sm:text-7xl md:text-8xl 2xl:text-9xl">Hi! I'm Anthony Li.</div>
            <div className="text-3xl md:text-4xl mt-1 md:mt-2">(aka anli5005)</div>
        </h1>
        {introBlurb && <div className="prose text-lg mb-8 less-margins">
            <PostContent html={introBlurb} />
        </div>}
        <h2 className="font-sans font-bold text-4xl mb-4">Some of the things I've done</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr mb-4">
            {projects.map(project => <HomeProject project={project} key={project.slug} />)}
        </div>
        <div className="text-lg mb-12">
            <Link href="/projects">
                <a className="link font-bold group">Even bigger list of things<FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform" /></a>
            </Link>
        </div>
        <h2 className="font-sans font-bold text-4xl mb-4">Fresh (enough) off the blog</h2>
        <div className="text-lg mb-6">
            {posts.map(post => <p className="mb-3 last:mb-0" key={post.id}>
                <Link href="/blog/[id]/[slug]" as={`/blog/${post.id}/${encodeURIComponent(post.slug)}`}>
                    <a className="link group">
                        {formatISODate(post.isoDate)}
                        {" • "}
                        <span className="text-default transition-colors group-hover:text-ocean-500 dark:group-hover:text-ocean-300">{post.title}</span>
                        <FontAwesomeIcon icon={faArrowRight} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                </Link>
            </p>)}
        </div>
        <div className="text-lg mb-12">
            <Link href="/blog">
                <a className="link font-bold group">Wander through the archives<FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform" /></a>
            </Link>
        </div>
        {misc && <>
            <h2 className="font-sans font-bold text-4xl mb-4">Other stuff you might find helpful</h2>
            <div className="prose less-margins text-lg mb-8 sm:mb-12">
                <PostContent html={misc} />
            </div>
        </>}
        <h2 className="font-sans font-bold text-4xl">Fin. <span className="text-white dark:text-ocean-1000 hover:text-pink-400 dark:hover:text-pink-600 transition-colors duration-1000">uwu</span></h2>
    </main>;
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
    const api = getAPI();
    const blurbPages = await api.pages().param("_fields", ["content"]).slug("intro-blurb");

    const projects: (HomeProjectData | null)[] = await Promise.all(homeProjects.map(({ slug, description }) => {
        return (async () => {
            const serverProjects = await api.projects().param("_fields", [
                "title",
                "brand_bg",
                "_links",
                "_embed",
            ]).param("_embed", [
                "wp:featuredmedia",
                "wp:term",
            ]).slug(slug);

            if (serverProjects.length === 0) return null;
            
            const project = serverProjects[0];

            let imageURL;
            if (project._embedded?.["wp:featuredmedia"]?.length > 0) {
                imageURL = project._embedded["wp:featuredmedia"][0].source_url;
            }

            return {
                title: project.title.rendered,
                bg: project.brand_bg || null,
                image: imageURL || null,
                slug,
                description,
            };
        })();
    }));

    const posts = await api.posts().param("_fields", [
        "id",
        "slug",
        "title",
        "date_gmt",
    ]).perPage(5);

    const miscPages = await api.pages().param("_fields", ["content"]).slug("misc");

    return {
        props: {
            introBlurb: blurbPages.length === 0 ? null : blurbPages[0].content.rendered,
            projects: projects.filter(project => project !== null) as HomeProjectData[],
            posts: posts.map((post: any) => ({
                id: post.id,
                slug: post.slug,
                title: post.title.rendered,
                isoDate: post.date_gmt,
            })),
            misc: miscPages.length === 0 ? null : miscPages[0].content.rendered,
        },
        revalidate: 15,
    };
}