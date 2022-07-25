import { faCalendar } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBreadcrumbConfiguration } from "components/Breadcrumbs";
import { PageTitle } from "components/PageTitle";
import PostContent from "components/PostContent";
import { getAPI } from "lib/api";
import { formatISODate } from "lib/dates";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { NextSeo } from "next-seo";

interface DynamicClassNoteProps {
    title: string;
    isoDate: string;
    content: string;
    hideDate: boolean;
    courseSlug: string;
    courseName: string;
}

export default function DynamicClassNote({ title, isoDate, content, hideDate, courseSlug, courseName }: DynamicClassNoteProps) {
    useBreadcrumbConfiguration({
        items: [
            {
                href: "/classnotes",
                title: "Notes for BCA Students",
            },
            {
                href: "/classnotes/[course]",
                as: `/classnotes/${encodeURIComponent(courseSlug)}`,
                title: courseName,
            }
        ],
        trailing: true,
    });

    return <div>
        <NextSeo title={title} />
        <PageTitle>
            {title}
        </PageTitle>
        {!hideDate && <div className="pb-4 text-lg md:text-xl font-sans font-bold text-slate-700 dark:text-slate-300">
            <div className="uppercase">
                <FontAwesomeIcon className="mr-2" icon={faCalendar} />
                {formatISODate(isoDate)}
            </div>
        </div>}
        <main className="md:mt-4 prose">
            <PostContent html={content} />
        </main>
    </div>;
}

export async function getStaticProps(ctx: GetStaticPropsContext<{ course: string, slug: string }>): Promise<GetStaticPropsResult<DynamicClassNoteProps>> {
    const revalidate = 60;

    if (!ctx.params) return { notFound: true };

    const api = getAPI();

    const courses = await api.courses().param("_fields", [
        "id",
        "slug",
        "name"
    ]).slug(ctx.params.course);

    if (courses.length === 0) {
        return {
            notFound: true,
            revalidate,
        };
    }

    const course = courses[0];

    const notes = await api.classnotes().param("_fields", [
        "date_gmt",
        "title",
        "content",
        "hide_date",
    ]).param("courses", course.id).slug(ctx.params.slug);

    if (notes.length === 0) {
        return {
            notFound: true,
            revalidate,
        };
    }

    const note = notes[0];

    return {
        props: {
            title: note.title.rendered,
            isoDate: note.date_gmt,
            content: note.content.rendered,
            hideDate: note.hide_date === "1",
            courseSlug: course.slug,
            courseName: course.name,
        },
        revalidate,
    };
}

export function getStaticPaths(): GetStaticPathsResult {
    return {
        paths: [],
        fallback: "blocking",
    };
}