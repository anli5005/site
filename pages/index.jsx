import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { faArrowRight, faEnvelope } from '@fortawesome/pro-regular-svg-icons';
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBrowser, faComment, faEllipsisH } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';

const socials = [
    {
        icon: faGithub,
        label: "GitHub",
        name: "anli5005",
        url: "https://github.com/anli5005",
    },
    {
        icon: faTwitter,
        label: "Twitter",
        name: "@anli5005",
        url: "https://twitter.com/anli5005"
    },
    {
        icon: faLinkedin,
        label: "LinkedIn",
        name: "anlidev",
        url: "https://linkedin.com/in/anlidev"
    },
    {
        icon: faEnvelope,
        label: "Email",
        name: "me@anli.dev",
        url: "mailto:me@anli.dev",
    }
];

function HomeSection({children}) {
    return <div className="mb-8">
        {children}
    </div>;
}

function HoverableDivider({className}) {
    return <hr className={`grow border-ocean-100 dark:border-gray-600 group-hover:border-ocean-200 dark:group-hover:border-gray-500 transition-colors duration-250 ${className}`} />;
}

function HomeHeading({children, href, className}) {
    return <Link href={href}>
        <a className={`font-sans uppercase tracking-wide text-xl flex items-center group transition-colors ${className} mb-1 duration-250`}>
            <HoverableDivider className="mr-4" />
            <h2>
                {children}
                <FontAwesomeIcon className="relative left-0 group-hover:left-1 transition-[left] ml-3" icon={faArrowRight} />
            </h2>
            <HoverableDivider className="ml-4" />
        </a>
    </Link>
}

function HomeLink({href, title, subtitle, className}) {
    return <Link href={href}>
        <a className={`flex text-lg ${className} dark:text-ocean-200 transition-colors duration-250`}>
            <div className="flex-grow">{title}</div>
            {subtitle && <div className="ml-2 opacity-80">{subtitle}</div>}
        </a>
    </Link>
}

export default function Home({posts, projects}) {
    return <div className="md:ml-[50%]">
        <NextSeo title="Anthony Li • anli5005 - Developer, Designer, Entrepreneur" openGraph={{
            title: "Anthony Li (anli5005) - Developer, Designer, Entrepreneur",
            url: "https://anli.dev",
            description: "The homepage of Anthony Li, or anli5005. Making random stuff, some of which might be helpful or entertaining. BCA ATCS '22"
        }} description="The homepage of Anthony Li, or anli5005. Making random stuff, some of which might be helpful or entertaining. BCA ATCS '22" />
        <div className="p-10 md:fixed top-0 left-0 md:w-1/2 bg-ocean-50 dark:bg-ocean-1000 h-full flex flex-col justify-center items-center md:pb-32">
            <img src="/images/logo.png" className="h-32 xl:h-48 2xl:h-54 mb-6 md:mb-4 block rounded-full overflow-hidden" />
            <h1 className="font-sans font-bold text-center">
                <span className="text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-transparent bg-clip-text bg-gradient-to-tr from-grape-800 dark:from-grape-600 via-ocean-700 dark:via-ocean-400 to-sage-500 block pb-4">
                    Anthony Li
                </span>
                <span className="sr-only select-none">anli5005</span>
            </h1>
            <div className="font-sans font-bold text-2xl xl:text-4xl text-ocean-500 -mt-3 xl:-mt-2 mb-6 text-center">anli<span className="opacity-70">5005</span></div>
            <p className="font-sans text-2xl text-center w-full">I make things.</p>
            <p className="font-sans text-center opacity-80">BCA ATCS '22</p>
        </div>
        <div className="p-10 flex flex-col justify-center md:h-screen">
            <HomeSection>
                <HomeHeading href="/blog" className="hover:text-sage-500 dark:hover:text-sage-400">
                    <FontAwesomeIcon className="text-sage-500 dark:text-sage-400 mr-3" icon={faComment} />
                    Blog
                </HomeHeading>
                {posts.map(post => {
                    const date = DateTime.fromISO(post.date_gmt, { zone: "utc" }).setZone(typeof window === "undefined" ? "America/New_York" : "local").toLocaleString({
                        month: "long",
                        day: "numeric",
                    });
                    return <HomeLink className="hover:text-sage-500 dark:hover:text-sage-400" key={post.id} href={`/blog/${post.id}/${post.slug}`} title={post.title} subtitle={date} />;
                })}
            </HomeSection>
            <HomeSection>
                <HomeHeading href="/projects" className="hover:text-ocean-500 dark:hover:text-ocean-400">
                    <FontAwesomeIcon className="text-ocean-500 dark:text-ocean-400 mr-3" icon={faBrowser} />
                    Portfolio
                </HomeHeading>
                {projects.map(project => {
                    return <HomeLink className="hover:text-ocean-500 dark:hover:text-ocean-400" key={project.id} href={`/projects/${project.slug}`} title={project.title} />;
                })}
            </HomeSection>
            <HomeSection>
                <HomeHeading href="/misc" className="hover:text-grape-600 dark:hover:text-grape-400">
                    <FontAwesomeIcon className="text-grape-600 dark:text-grape-400 mr-3" icon={faEllipsisH} />
                    Misc
                </HomeHeading>
                <HomeLink className="hover:text-grape-600 dark:hover:text-grape-400" href="/classnotes" title="Class Notes" />
                <HomeLink className="hover:text-grape-600 dark:hover:text-grape-400" href="/timestamper" title="UNIX Timestamper" />
            </HomeSection>
        </div>
        <div className="md:fixed left-0 right-1/2 bottom-0 flex-col items-center justify-center md:pt-10 px-10 pb-10 md:bg-gradient-to-t from-white to-white/0 dark:from-ocean-1000 dark:to-ocean-1000/0">
            <h3 className="font-sans uppercase text-lg tracking-wider text-center">Find me on</h3>
            <div className="flex justify-center items-center mt-3">
                {socials.map((social, index) => <a key={index} href={social.url} target="_blank" className="transition-colors relative mr-2 last:mr-0 rounded-full w-12 h-12 bg-ocean-1000 md:bg-ocean-950 hover:bg-ocean-900 shadow text-center flex justify-center items-center text-xl group" rel="noopener noreferrer">
                    <FontAwesomeIcon className="text-ocean-100" icon={social.icon} />
                    <span className="sr-only">{social.label}</span>
                    <div className="transition-all ease-out mr-4 text-sm font-sans opacity-0 group-hover:-bottom-6 group-hover:opacity-100 group-focus:-bottom-5 group-focus:opacity-100 absolute -bottom-4 left-1/2 -translate-x-1/2">{social.name}</div>
                </a>)}
            </div>
        </div>
    </div>;
}

export async function getStaticProps(ctx) {
    const postURL = "https://wp.anli.dev/wp-json/wp/v2/posts?_fields=id,slug,title,date_gmt&per_page=5";
    const projectURL = "https://wp.anli.dev/wp-json/wp/v2/project?_fields=id,slug,title&per_page=5"
    const [postResponse, projectResponse] = await Promise.all([fetch(postURL), fetch(projectURL)]);
    const postData = await postResponse.json();
    const projectData = await projectResponse.json();

    const props = {
        posts: postData.map(post => ({
            id: post.id,
            slug: post.slug,
            date_gmt: post.date_gmt,
            title: post.title.rendered,
        })),
        projects: projectData.map(project => ({
            id: project.id,
            slug: project.slug,
            title: project.title.rendered
        }))
    };

    return {props, revalidate: 10};
}
