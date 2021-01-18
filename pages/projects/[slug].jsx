import Page from 'components/Page';
import { Breadcrumb } from 'react-bootstrap';
import Link from 'next/link';
import PostContent from 'components/PostContent';
import ProjectButton from 'components/ProjectButton';
import { Badge } from 'react-bootstrap';
import { decode } from 'he';

export default function SingleProject({errorCode, project, technologies}) {
    if (errorCode) return <ErrorComponent statusCode={errorCode} />;

    return <Page logoAccent={project.brand.bg || "portfolioAccent"} title={project.title}>
        <Breadcrumb>
            <Link href="/projects" passHref><Breadcrumb.Item>Portfolio</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>{project.title}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{project.title}</h1>
        {project.technologies.length > 0 && <p>{project.technologies.map(({id, name}) =>
            <Badge variant="secondary" key={id}>{decode(name)}</Badge>
        )}</p>}
        <p class="lead">{project.shortDescription}</p>
        {project.url && <p><ProjectButton project={project} /></p>}
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

    const url = "https://wp.anli.dev/wp-json/wp/v2/project/?slug=" + encodeURIComponent(slug) + "&_fields=id,title,content,short_description,project_url,project_domain,brand_bg,brand_fg";
    const response = await fetch(url);
    const data = await response.json();

    if (data.data && data.data.status) {
        return {props: {errorCode: data.data.status}};
    }

    if (data.length === 0) {
        return {props: {errorCode: 404}};
    }

    const technologiesResponse = await fetch("https://wp.anli.dev/wp-json/wp/v2/technologies?post=" + encodeURIComponent(data[0].id.toString()) + "&_fields=id,name");
    let technologies = await technologiesResponse.json();
    if (!technologies.length) {
        technologies = [];
    }

    const props = {
        project: {
            title: data[0].title.rendered,
            content: data[0].content.rendered,
            shortDescription: data[0].short_description || null,
            url: data[0].project_url || null,
            domain: data[0].project_domain || null,
            brand: {
                bg: data[0].brand_bg || null,
                fg: data[0].brand_fg || null
            },
            technologies
        }
    };

    return {props};
}