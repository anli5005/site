import Page from 'components/Page';
import { stringify } from 'querystring';
import Link from 'next/link';
import { Breadcrumb } from 'react-bootstrap';
import { DateTime } from 'luxon';
import PostContent from 'components/PostContent';
import styled from 'styled-components';
import { ErrorComponent } from '../../_error';

const NotesDate = styled.p`
    font-weight: normal;
    margin-bottom: 0;
    margin-top: ${props => props.theme.spacing.lg};
`;

const NotesContent = styled.div`
    & img {
        max-width: 100%;
        width: auto;
        height: auto;
    }
`;

export default function Notes({ courseName, courseSlug, title, date, content, errorCode }) {
    if (errorCode) return <ErrorComponent statusCode={errorCode} />;

    const dateStr = DateTime.fromISO(date, { zone: "utc" }).setZone(typeof window === "undefined" ? "America/New_York" : "local").toLocaleString({
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return <Page title={(title.length === 0 ? "" : `${title} - `) + dateStr} logoAccent="moreAccent">
        <Breadcrumb>
            <Link href="/misc" passHref><Breadcrumb.Item>More Stuff</Breadcrumb.Item></Link>
            <Link href="/classnotes" passHref><Breadcrumb.Item>Class Notes</Breadcrumb.Item></Link>
            <Link href="/classnotes/[course]" as={`/classnotes/${courseSlug}`} passHref><Breadcrumb.Item>{courseName}</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>{title}</Breadcrumb.Item>
        </Breadcrumb>
        {title.length > 0 && <NotesDate className="h3">{dateStr}</NotesDate>}
        <h1>{title.length === 0 ? dateStr : title}</h1>
        <NotesContent><PostContent html={content} /></NotesContent>
        <p><em><a href="https://docs.google.com/forms/d/e/1FAIpQLSc5Sw69CWSVeZ3XDWdSoD0EIvBRbaZQ_MFOmg-kz1hbnyrtWw/viewform?usp=sf_link">Report an issue</a></em></p>
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