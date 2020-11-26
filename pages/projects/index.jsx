import Page from 'components/Page';
import { stringify } from 'querystring';
import { Pagination, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Link from 'next/link';
import { BlogPaginationItem, CustomPagination } from '../blog/index';
import { ErrorComponent } from '../_error';

function urlForPage(page) {
    if (page === 1) {
        return "/projects";
    } else {
        return `?page=${page}`;
    }
}

const Project = styled.a`
    display: block;
    background-color: ${props => props.theme.colors.cardBackground};
    color: ${props => props.theme.colors.text};
    height: 100%;

    &:hover {
        text-decoration: none;
        color: ${props => props.theme.colors.text};
    }
`;

export default function Portfolio({projects, page, errorCode, totalPages}) {
    if (errorCode) return <ErrorComponent statusCode={errorCode} />;
    
    return <Page title="Portfolio" logoAccent="portfolioAccent">
        <h1>Portfolio</h1>

        <Row className="pl-3 pl-sm-0">
            {projects.map(({slug, title, shortDescription}) => {
                return <div class="col-12 col-md-6 mb-3 position-relative pl-0">
                    <Link href="/projects/[slug]" as={`/projects/${slug}`} passHref>
                        <Project className="shadow rounded p-3">
                            <h2>{title}</h2>
                            <p>{shortDescription}</p>
                        </Project>
                    </Link>
                </div>;
            })}
        </Row>

        {totalPages > 1 && <CustomPagination>
            {page > 1 ? <Link href={urlForPage(page - 1)} passHref><Pagination.Prev /></Link> : <Pagination.Prev disabled />}
            <BlogPaginationItem page={1} currentPage={page} />
            {page > 3 && <Pagination.Ellipses disabled />}
            {range(Math.max(2, page - 2), Math.min(page + 3, totalPages)).map(destination => <BlogPaginationItem key={destination} page={destination} currentPage={page} />)}
            {page < totalPages - 2 && <Pagination.Ellipses disabled />}
            <BlogPaginationItem page={totalPages} currentPage={page} />
            {page < totalPages ? <Link href={urlForPage(page + 1)} passHref><Pagination.Next /></Link> : <Pagination.Next disabled />}
        </CustomPagination>}
    </Page>
}

export async function getServerSideProps(ctx) {
    const perPage = 20;
    const page = (ctx.query && ctx.query.page && parseInt(ctx.query.page)) || 1;
    if (Number.isNaN(ctx.query.page) || page < 0) {
        return {
            props: {
                errorCode: 400
            }
        };
    }

    const query = {
        _fields: "slug,title,short_description",
        per_page: perPage,
        page
    };

    const url = "https://wp.anli.dev/wp-json/wp/v2/project?" + stringify(query);
    const response = await fetch(url);
    const total = parseInt(response.headers.get("x-wp-total"));
    const totalPages = parseInt(response.headers.get("x-wp-totalpages"));
    const data = await response.json();

    if (!data.map) { // TODO: Actually consider type
        return {
            props: {
                errorCode: 404
            }
        };
    }

    const props = {
        projects: data.map(postData => ({
            slug: postData.slug,
            title: postData.title.rendered,
            shortDescription: postData.short_description
        })),
        perPage,
        page
    };

    if (!Number.isNaN(total)) {
        props.total = total;
    }

    if (!Number.isNaN(totalPages)) {
        props.totalPages = totalPages;
    }

    return {props};
}