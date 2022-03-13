import Page from 'components/Page';
import Link from 'next/link';
import styled from 'styled-components';
import { lighten } from "polished";
import { stringify } from 'querystring';
import { Pagination } from 'react-bootstrap';
import { PostDate } from 'components/ComponentVariants';
import range from 'lodash.range';
import PostContent from 'components/PostContent';
import { ErrorComponent } from '../_error';
import { DateTime } from 'luxon';
import { TitleHeader } from '../../components/TitleHeader';

const Post = styled.article`
    margin-top: ${props => props.theme.spacing.xl};
`;

const PostLink = styled.a`
    text-decoration: none;

    @media (prefers-color-scheme: dark) {
        color: ${props => lighten(0.1, props.theme.colors.dark.link)};

        &:hover {
            color: ${props => props.theme.colors.dark.link};
        }
    }
`;

const PostTitle = styled.h2`
    margin-bottom: 0;
`;

export const CustomPagination = styled(Pagination)`
    font-family: ${props => props.theme.fonts.heading};
    margin-top: ${props => props.theme.spacing.xl};
`;

function urlForPage(page) {
    if (page === 1) {
        return "/blog";
    } else {
        return `?page=${page}`;
    }
}

export function BlogPaginationItem({page, currentPage}) {
    return <Link href={urlForPage(page)} passHref>
        <Pagination.Item active={currentPage === page}>{page}</Pagination.Item>
    </Link>
}

export default function Blog({posts, errorCode, total, totalPages, page}) {
    if (errorCode) return <ErrorComponent statusCode={errorCode} />;

    return <Page title="Blog" logoAccent="blogAccent">
        <TitleHeader>Blog</TitleHeader>
        {posts.map(({id, slug, date, title, content}) => {
            const dateStr = DateTime.fromISO(date, { zone: "utc" }).setZone(typeof window === "undefined" ? "America/New_York" : "local").toLocaleString({
                month: "long",
                day: "numeric",
                year: "numeric",
            });
            return <Post key={id} className={`post post-${id} post-${slug}`}>
                <Link href="/blog/[id]/[slug]" as={`/blog/${id}/${slug}`} passHref>
                    <PostLink>
                        <PostTitle>{title}</PostTitle>
                        <PostDate>{dateStr}</PostDate>
                    </PostLink>
                </Link>
                
                <PostContent html={content} />
            </Post>
        })}
        {totalPages > 1 && <CustomPagination>
            {page > 1 ? <Link href={urlForPage(page - 1)} passHref><Pagination.Prev /></Link> : <Pagination.Prev disabled />}
            <BlogPaginationItem page={1} currentPage={page} />
            {page > 3 && <Pagination.Ellipses disabled />}
            {range(Math.max(2, page - 2), Math.min(page + 3, totalPages)).map(destination => <BlogPaginationItem key={destination} page={destination} currentPage={page} />)}
            {page < totalPages - 2 && <Pagination.Ellipses disabled />}
            <BlogPaginationItem page={totalPages} currentPage={page} />
            {page < totalPages ? <Link href={urlForPage(page + 1)} passHref><Pagination.Next /></Link> : <Pagination.Next disabled />}
        </CustomPagination>}
    </Page>;
}

export async function getServerSideProps(ctx) {
    const perPage = 10;
    const page = (ctx.query && ctx.query.page && parseInt(ctx.query.page)) || 1;
    if (Number.isNaN(ctx.query.page) || page < 0) {
        ctx.res.statusCode = 400;
        return {
            props: {
                errorCode: 400
            }
        };
    }

    const query = {
        _fields: "id,slug,title,content,date_gmt,meta,featured_media,_links",
        per_page: perPage,
        page
    };

    const url = "https://wp.anli.dev/wp-json/wp/v2/posts?" + stringify(query);
    const response = await fetch(url);
    const total = parseInt(response.headers.get("x-wp-total"));
    const totalPages = parseInt(response.headers.get("x-wp-totalpages"));
    const data = await response.json();

    if (!data.map) { // TODO: Actually consider type
        ctx.res.statusCode = 404;
        return {
            props: {
                errorCode: 404
            }
        };
    }

    const props = {
        posts: data.map(postData => ({
            id: postData.id,
            slug: postData.slug,
            date: postData.date_gmt,
            title: postData.title.rendered,
            content: postData.content.rendered
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