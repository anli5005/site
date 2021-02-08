import Page from 'components/Page';
import { stringify } from 'querystring';
import Link from 'next/link';
import { Breadcrumb } from 'react-bootstrap';
import { DateTime } from 'luxon';
import PostContent from 'components/PostContent';

export default function Notes({ courseName, courseSlug, title, date, content }) {
    return <Page title={title} logoAccent="moreAccent">
        <Breadcrumb>
            <Link href="/misc" passHref><Breadcrumb.Item>More Stuff</Breadcrumb.Item></Link>
            <Link href="/classnotes" passHref><Breadcrumb.Item>Class Notes</Breadcrumb.Item></Link>
            <Link href="/classnotes/[course]" as={`/classnotes/${courseSlug}`} passHref><Breadcrumb.Item>{courseName}</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{title}</h1>
        <PostContent html={content} />
    </Page>;
}

export async function getServerSideProps({ params, res }) {
    const course = params.course;
    const slug = params.slug;
    if (!course || !slug) {
        res.statusCode = 404;
        return {
            props: {
                errorCode: 404
            }
        };
    }

    const courseURL = "https://wp.anli.dev/wp-json/wp/v2/courses/?slug=" + encodeURIComponent(course) + "&_fields=id,slug,name";
    const courseResponse = await fetch(courseURL);
    const courseData = await courseResponse.json();

    if (courseData.data && courseData.data.status) {
        res.statusCode = courseData.data.status;
        return { props: { errorCode: courseData.data.status } };
    }

    if (courseData.length === 0) {
        res.statusCode = 404;
        return { props: { errorCode: 404 } };
    }

    const notesURL = "https://wp.anli.dev/wp-json/wp/v2/classnotes?" + stringify({
        courses: courseData[0].id,
        slug,
        _fields: "id,date_gmt,slug,title,content"
    });
    const notesResponse = await fetch(notesURL);
    const notesData = await notesResponse.json();

    if (notesData.data && notesData.data.status) {
        res.statusCode = notesData.data.status;
        return { props: { errorCode: notesData.data.status } };
    }

    if (notesData.length === 0) {
        res.statusCode = 404;
        return { props: { errorCode: 404 } };
    }

    const props = {
        courseName: courseData[0].name,
        courseSlug: courseData[0].slug,
        id: notesData[0].id,
        slug: notesData[0].slug,
        title: notesData[0].title.rendered,
        date: notesData[0].date_gmt,
        content: notesData[0].content.rendered
    };

    return { props };
}