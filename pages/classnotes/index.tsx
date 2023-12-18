import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTopLevelBreadcrumbConfiguration } from "components/Breadcrumbs";
import { PageTitle } from "components/PageTitle";
import { getAPI } from "lib/api";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { readableColor } from "polished";

interface ClassNotesProps {
    courses: {
        id: number,
        slug: string,
        name: string,
        color?: string,
    }[];
}

export default function ClassNotes({ courses }: ClassNotesProps) {
    useTopLevelBreadcrumbConfiguration();

    return <>
        <NextSeo title="Notes for BCA Students" />
        <PageTitle>Notes for BCA Students</PageTitle>
        <div className="prose mb-4">
            <p>A collection of notes from various classes at BCA. No guarantees as to the quality or accuracy of these notes, but they're here in the off chance that they're helpful.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => {
                const style = course.color ? {
                    backgroundColor: course.color,
                    color: readableColor(course.color),
                } : {};

                return <Link href="/classnotes/[course]" as={`/classnotes/${encodeURIComponent(course.slug)}`} className="block rounded p-4 group hover:opacity-80 active:opacity-60 transition-opacity" style={style}>
                    {course.name}
                    <FontAwesomeIcon className="ml-2 transform group-hover:translate-x-1 transition-transform" icon={faArrowRight} />
                </Link>;
            })}
        </div>
        <div className="my-4 sm:my-16 flex items-center justify-center">
            <a href="https://www.youtube.com/watch?v=izHyKdrSKvo" className="link opacity-50 italic text-xl" target="_blank" rel="noopener noreferrer">
                [porter robinson lyrics]
            </a>
        </div>
    </>;
}

export async function getStaticProps() {
    const api = getAPI();

    let current = api.courses().perPage(100).param("_fields", [
        "id",
        "slug",
        "name",
        "color",
    ]);
    let courses = [];
    while (current) {
        const currentCourses = await current;
        courses.push(...currentCourses);
        current = currentCourses._paging.next;
    }

    return {
        props: { courses },
        revalidate: 120,
    };
}