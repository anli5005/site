import Page from 'components/Page';
import { stringify } from 'querystring';
import Link from 'next/link';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { lighten, readableColor } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons';

const NotesFooter = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 80px;
    opacity: 0.7;
    font-size: 24px;
    font-style: italic;

    & a {
        text-decoration: underline;
    }
`;

const CourseLink = styled.a`
    display: block;
    width: 100%;
    height: 100%;
    box-shadow: ${props => props.theme.shadows.md};
    ${props => props.color ? `
        background-color: ${props.color};
        color: ${readableColor(props.color)};
        &:hover, &:focus, &:active {
            background-color: ${lighten(0.1, props.color)};
            text-decoration: none;
            color: ${readableColor(props.color)};
        }
    ` : `
        background-color: ${props.theme.colors.cardBackground};
        color: ${props.theme.colors.text};
        &:hover, &:focus, &:active {
            text-decoration: none;
            color: ${readableColor(props.color)};
        }

        @media (prefers-color-scheme: dark) {
            background-color: ${props.theme.colors.darkBackground};
        }
    `}

    &:hover, &:focus, &:active {
        box-shadow: ${props => props.theme.shadows.lg};
    }

    & .fa-arrow-right {
        position: relative;
        left: 0;
        transition: left 0.2s;
    }

    &:hover .fa-arrow-right, &:focus .fa-arrow-right, &:active .fa-arrow-right {
        left: ${props => props.theme.spacing.xs};
    }

    padding: ${props => props.theme.spacing.md};
    transition: box-shadow 0.2s, background-color 0.2s;
`;

function Course({ course: { slug, name, year, color } }) {
    return <Col xs={12} sm={6} md={4} className="mb-3">
        <Link href="/classnotes/[course]" as={`/classnotes/${slug}`} passHref>
            <CourseLink className="rounded" color={color}>{name} <FontAwesomeIcon icon={faArrowRight} /></CourseLink>
        </Link>
    </Col>
}

export default function ClassNotes({courses}) {
    return <Page title="Class Notes" logoAccent="moreAccent">
        <Breadcrumb>
            <Link href="/misc" passHref><Breadcrumb.Item>More Stuff</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>Class Notes</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Notes for BCA Students</h1>
        <p>A collection of notes from various classes at BCA. No guarantees as to the quality or accuracy of these notes, but they're here in the off chance that they're helpful.</p>
        <Row>
            {courses.map(course => (
                <Course key={course.id} course={course} />
            ))}
        </Row>
        <NotesFooter>
            <a href="https://genius.com/Porter-robinson-look-at-the-sky-lyrics">Stay hopeful.</a>
        </NotesFooter>
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