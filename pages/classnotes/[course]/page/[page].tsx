import { faNotebook } from "@fortawesome/pro-regular-svg-icons";
import { homeBreadcrumbItem, useBreadcrumbConfiguration } from "components/Breadcrumbs";
import { getProps, PagedContent, PagedContentProps } from "components/PagedContent";
import { PageTitle } from "components/PageTitle";
import { getAPI } from "lib/api";
import { formatISODate } from "lib/dates";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

interface CoursePageProps extends PagedContentProps<any> {
    slug: string;
    name: string;
}

export default function CoursePage({ slug, name, ...pagedContentProps }: CoursePageProps) {
    useBreadcrumbConfiguration({
        items: [
            homeBreadcrumbItem,
            {
                icon: faNotebook,
                href: "/classnotes",
                title: "Notes for BCA Students",
            },
        ],
        trailing: true,
    });

    return <>
        <NextSeo title={name} openGraph={{
            title: name,
        }} />
        <PageTitle>
            {name}
        </PageTitle>
        <PagedContent {...pagedContentProps} getPagePath={page => {
            if (page === 1) return { href: "/classnotes/[course]", as: `/classnotes/${encodeURIComponent(slug)}` };
            return {
                href: "/classnotes/[course]/page/[page]",
                as: `/classnotes/${encodeURIComponent(slug)}/page/${page}`,
            };
        }}>
            {notes => notes.map(note => <p className="first-of-type:mt-4 mb-4" key={note.id}>
                <Link href="/classnotes/[course]/[slug]" as={`/classnotes/${encodeURIComponent(slug)}/${encodeURIComponent(note.slug)}`}>
                    <a className="link">
                        {note.title}{!note.hideDate && ` • ${formatISODate(note.isoDate)}`}
                    </a>
                </Link>
            </p>)}
        </PagedContent>
    </>;
}

export async function getCourseProps(slug: string, page: number) {
    const api = getAPI();
    let courseName = "";

    const result = await getProps(page, async page => {
        try {
            const courses = await api.courses().param("_fields", [
                "id",
                "name",
            ]).slug(slug);

            if (courses.length === 0) return [];
            const course = courses[0];
            courseName = course.name;

            const notes = await api.classnotes().param("courses", course.id).page(page).param("_fields", [
                "id",
                "date_gmt",
                "slug",
                "title",
                "hide_date",
            ]);
            return notes;
        } catch (e: any) {
            if (e.code === "rest_post_invalid_page_number") return [];
            throw e;
        }
    }, note => {
        return {
            id: note.id,
            slug: note.slug,
            title: note.title.rendered,
            isoDate: note.date_gmt,
            hideDate: note.hide_date === "1",
        };
    });
    
    if ("props" in result) {
        return {
            props: {
                ...result.props,
                slug,
                name: courseName,
            },
        };
    } else {
        return result;
    }
}

export async function getServerSideProps(ctx: GetStaticPropsContext<{ course: string, page: string }>) {
    if (!ctx.params) {
        return { notFound: true };
    }

    if (!/^[1-9][0-9]*$/.test(ctx.params.page)) {
        return { notFound: true };
    }

    const page = parseInt(ctx.params.page);

    const result = await getCourseProps(ctx.params.course, page);
    if ("notFound" in result) {
        return { notFound: true };
    } else {
        return result;
    }
}