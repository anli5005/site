import Page from 'components/Page';
import { stringify } from 'querystring';
import Link from 'next/link';
import { Breadcrumb } from 'react-bootstrap';
import { DateTime } from 'luxon';
import { ErrorComponent } from '../../_error';

export default function CourseNotes({name, slug, notes, errorCode}) {
    if (errorCode) return <ErrorComponent statusCode={errorCode} />;

    return <Page title={name} logoAccent="moreAccent">
        <Breadcrumb>
            <Link href="/misc" passHref><Breadcrumb.Item>More Stuff</Breadcrumb.Item></Link>
            <Link href="/classnotes" passHref><Breadcrumb.Item>Class Notes</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>{name}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{name}</h1>
        {notes.map(data => {
            const dateStr = DateTime.fromISO(data.date, { zone: "utc" }).setZone(typeof window === "undefined" ? "America/New_York" : "local").toLocaleString({
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            return <p key={data.id}>
                <Link href="/classnotes/[course]/[slug]" as={`/classnotes/${slug}/${data.slug}`}>
                    <a>{data.title.length > 0 && `${data.title}${data.hideDate ? "" : " • "}`}{!data.hideDate && dateStr}</a>
                </Link>
            </p>;
        })}
        {notes.length === 0 && <p>There doesn't appear to be any notes here yet. Check back soon!</p>}
    </Page>;
}

export async function getServerSideProps({ params, res }) {
    const slug = params.course;
    if (!slug) {
        res.statusCode = 404;
        return {
            props: {
                errorCode: 404
            }
        };
    }

    const url = "https://wp.anli.dev/wp-json/wp/v2/courses/?slug=" + encodeURIComponent(slug) + "&_fields=id,slug,name,year,color";
    const response = await fetch(url);
    const data = await response.json();

    if (data.data && data.data.status) {
        res.statusCode = data.data.status;
        return { props: { errorCode: data.data.status } };
    }

    if (data.length === 0) {
        res.statusCode = 404;
        return { props: { errorCode: 404 } };
    }

    const notesURL = "https://wp.anli.dev/wp-json/wp/v2/classnotes?" + stringify({
        courses: data[0].id,
        _fields: "id,date_gmt,slug,title,hide_date",
        per_page: 25
    });
    const notesResponse = await fetch(notesURL);
    const notesData = await notesResponse.json();

    if (!notesData.map) { // TODO: Actually consider type
        res.statusCode = 502;
        return {
            props: {
                errorCode: 502
            }
        };
    }

    const props = {
        name: data[0].name,
        slug: data[0].slug,
        year: data[0].year || null,
        color: data[0].color || null,
        notes: notesData.map(notes => ({
            id: notes.id,
            slug: notes.slug,
            title: notes.title.rendered,
            date: notes.date_gmt,
            hideDate: notes.hide_date === "1"
        }))
    };

    return { props };
}
