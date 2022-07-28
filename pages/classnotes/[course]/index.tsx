import { getAPI } from "lib/api";
import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import CoursePage, { getCourseProps } from "./page/[page]";

export default CoursePage;

export async function getStaticProps(ctx: GetStaticPropsContext<{ course: string }>) {
    if (!ctx.params) return {
        notFound: true
    };

    const result = await getCourseProps(ctx.params.course, 1);
    const revalidate = 15;
    if ("notFound" in result) {
        if (result.shouldRevalidate) {
            return {
                notFound: true,
                revalidate,
            };
        } else {
            return {
                notFound: true,
            };
        }
    } else {
        return {
            props: result.props,
            revalidate,
        };
    }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const api = getAPI();

    let current = api.courses().perPage(100).param("_fields", "slug");
    let courses = [];
    while (current) {
        const currentCourses = await current;
        courses.push(...currentCourses);
        current = currentCourses._paging.next;
    }

    return {
        paths: courses.map(course => ({
            params: { course: course.slug },
        })),
        fallback: "blocking",
    };
}