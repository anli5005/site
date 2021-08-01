import Page from 'components/Page';
import { Breadcrumb } from 'react-bootstrap';
import Link from 'next/link';
import PostContent from 'components/PostContent';
import ProjectButton from 'components/ProjectButton';
import { Badge } from 'react-bootstrap';
import { decode } from 'he';
import { ErrorComponent } from '../_error';
import styled from 'styled-components';
import { readableColor, transparentize } from 'polished';

const ProjectHeader = styled.h1`
    border-radius: 16px;
    ${({image, bg, theme}) => {
        if (image || bg) {
            return `
            padding: ${theme.spacing.lg};
            background-color: ${bg || theme.colors.secondaryBackground};
            margin-bottom: ${theme.spacing.xl};
            `;
        } else {
            return "";
        }
    }}
    ${({bg, theme}) => {
        if (bg) {
            const color = readableColor(bg);
            return `
            color: ${color};
            small {
                opacity: 0.5;
            }
            `;
        } else {
            return `
            small {
                color: ${theme.colors.secondary};
            }
            `;
        }
    }}
    ${({image, bg, theme}) => {
        if (image) {
            if (bg) {
                const overlayColor = transparentize(0.4, bg);
                return `
                background-image: linear-gradient(${overlayColor}, ${overlayColor}), url(${image});
                `;
            } else {
                const lightOverlay = transparentize(0.4, theme.colors.light.cardBackground);
                const darkOverlay = transparentize(0.4, theme.colors.dark.cardBackground);
                return `
                background-image: linear-gradient(${lightOverlay}, ${lightOverlay}), url(${image});
                @media (prefers-color-scheme: dark) {
                    background-image: linear-gradient(${darkOverlay}, ${darkOverlay}), url(${image});
                }
                `;
            }
        } else {
            return "";
        }
    }}
    ${({image}) => {
        if (image) {
            return `
            padding-top: 128px;
            background-position: center;
            background-size: cover;
            `;
        } else {
            return "";
        }
    }}
`;

export default function SingleProject({errorCode, project}) {
    if (errorCode) return <ErrorComponent statusCode={errorCode} />;

    return <Page logoAccent={project.brand.bg || "portfolioAccent"} title={project.title} openGraph={{
        description: project.shortDescription
    }}>
        <Breadcrumb>
            <Link href="/projects" passHref><Breadcrumb.Item>Portfolio</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>{project.title}</Breadcrumb.Item>
        </Breadcrumb>
        <ProjectHeader image={project.featuredImage} bg={project.brand.bg}>{project.title}{project.year && <> <small>{project.year}</small></>}</ProjectHeader>
        {project.tags.length > 0 && <p>{project.tags.map(({id, name}) =>
            <Badge bg="dark" key={id} className="me-1">{decode(name)}</Badge>
        )}</p>}
        <p className="lead">{project.shortDescription}</p>
        {project.url && <p className="mb-5"><ProjectButton project={project} /></p>}
        <PostContent html={project.content} />
    </Page>;
}

export async function getServerSideProps({params, res}) {
    const slug = params.slug;
    if (!slug) {
        res.statusCode = 404;
        return {
            props: {
                errorCode: 404
            }
        };
    }

    const url = "https://wp.anli.dev/wp-json/wp/v2/project/?slug=" + encodeURIComponent(slug) + "&_fields=id,title,content,short_description,project_url,project_domain,brand_bg,brand_fg,year,_links,_embed&_embed=wp:featuredmedia";
    const response = await fetch(url);
    const data = await response.json();

    if (data.data && data.data.status) {
        res.statusCode = data.data.status;
        return {props: {errorCode: data.data.status}};
    }

    if (data.length === 0) {
        res.statusCode = 404;
        return {props: {errorCode: 404}};
    }

    const tagsResponse = await fetch("https://wp.anli.dev/wp-json/wp/v2/tags?post=" + encodeURIComponent(data[0].id.toString()) + "&_fields=id,name");
    let tags = await tagsResponse.json();
    if (!tags.length) {
        tags = [];
    }

    const media = data[0]._embedded && data[0]._embedded["wp:featuredmedia"];
    const image = media && media.length > 0 && media[0].source_url;
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
            tags,
            year: data[0].year || null,
            featuredImage: image || null
        }
    };

    return {props};
}