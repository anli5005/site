import PostContent from "components/PostContent";
import { getAPI } from "lib/api";
import { GetStaticPropsResult } from "next";
import { NextSeo } from "next-seo";
import homeProjects from "data/home-projects.json";

interface HomeProps {
    introBlurb: string | null;
    projects: {
        title: string,
        bg?: string,
        image?: string,
        description: string,
    }[];
}

export default function Home({ introBlurb }: HomeProps) {
    return <main>
        <NextSeo title="Anthony Li • anli5005 - Developer, Designer, Entrepreneur" titleTemplate="%s" />
        <h1 className="text-6xl sm:text-7xl md:text-8xl 2xl:text-9xl font-bold font-sans -mt-2 md:-mt-4 2xl:-mt-6 pb-4 sm:pb-8 bg-clip-text text-transparent w-fit bg-gradient-to-br from-sage-500 via-ocean-500 to-grape-600 dark:from-sage-400 dark:via-ocean-400 dark:to-grape-400">Hi! I'm Anthony Li.</h1>
        {introBlurb && <div className="prose text-lg mb-8 sm:mb-12">
            <PostContent html={introBlurb} />
        </div>}
        <h2 className="font-sans font-bold text-4xl">Some of the things I've done</h2>
    </main>;
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
    const api = getAPI();
    const pages = await api.pages().param("_fields", ["content"]).slug("intro-blurb");

    return {
        props: {
            introBlurb: pages.length === 0 ? null : pages[0].content.rendered,
            projects: [],
        },
        revalidate: 15,
    };
}