import Page from 'components/Page';
import { Breadcrumb } from 'react-bootstrap';
import Error from 'next/error';
import Link from 'next/link';
import PostContent from 'components/PostContent';

export default function SingleProject({errorCode, project}) {
    if (errorCode) return <Error statusCode={errorCode} />;

    return <Page logoAccent={project.brand.bg || "portfolioAccent"} title={project.title}>
        <Breadcrumb>
            <Link href="/projects" passHref><Breadcrumb.Item>Portfolio</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>{project.title}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{project.title}</h1>
        <PostContent html={project.content} />
    </Page>;
}

export async function getServerSideProps({params}) {
    const slug = params.slug;
    if (!slug) {
        return {
            props: {
                errorCode: 404
            }
        };
    }

    const url = "https://wp.anli.dev/wp-json/wp/v2/project/?slug=" + encodeURIComponent(slug) + "&_fields=title,content,brand_bg";
    const response = await fetch(url);
    const data = await response.json();

    if (data.data && data.data.status) {
        return {props: {errorCode: data.data.status}};
    }

    if (data.length === 0) {
        return {props: {errorCode: 404}};
    }

    const props = {
        project: {
            title: data[0].title.rendered,
            content: data[0].content.rendered,
            brand: {
                bg: data[0].brand_bg || null
            }
        }
    };

    return {props};
}