import Page from 'components/Page';
import { stringify } from 'querystring';
import Link from 'next/link';
import { Breadcrumb } from 'react-bootstrap';

function Course({ course: { slug, name, year, color } }) {
    return <p>
        <Link href="/classnotes/[course]" as={`/classnotes/${slug}`}>
            <a>{name}</a>
        </Link>
    </p>
}

export default function ClassNotes({courses}) {
    return <Page title="Class Notes" logoAccent="moreAccent">
        <Breadcrumb>
            <Link href="/misc" passHref><Breadcrumb.Item>More Stuff</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>Class Notes</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Notes for BCA Students</h1>
        <p>A collection of notes from various classes at BCA. No guarantees as to the quality or accuracy of these notes, but they're here in the off chance that they're helpful.</p>
        {courses.map(course => (
            <Course key={course.id} course={course} /> 
        ))}
    </Page>;
}

export async function getServerSideProps(ctx) {
    const query = {
        _fields: "id,slug,name,year,color"
    };

    const url = "https://wp.anli.dev/wp-json/wp/v2/courses?" + stringify(query);
    const response = await fetch(url);
    const data = await response.json();

    if (!data.map) { // TODO: Actually consider type
        ctx.res.statusCode = 502;
        return {
            props: {
                errorCode: 502
            }
        };
    }

    const props = {
        courses: data.map(courseData => ({
            id: courseData.id,
            slug: courseData.slug,
            name: courseData.name,
            year: courseData.year || null,
            color: courseData.color || null
        }))
    };

    return { props };
}