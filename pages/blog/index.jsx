import Page from 'components/Page';
import Link from 'next/link';
import styled from 'styled-components';
import Error from 'next/error';
import { lighten } from "polished";

import { stringify } from 'querystring';
import PostContent from 'components/PostContent';

const Post = styled.article`
    margin-top: ${props => props.theme.spacing.xl};
`;

const PostLink = styled.a`
    @media (prefers-color-scheme: dark) {
        color: ${props => lighten(0.1, props.theme.colors.dark.link)};

        &:hover {
            color: ${props => lighten(0.2, props.theme.colors.dark.link)};
        }
    }
`;

const PostTitle = styled.h2`
    margin-bottom: 0;
`;

const PostDate = styled.p`
    font-family: ${props => props.theme.fonts.heading};
    text-transform: uppercase;
    font-weight: bold;
    opacity: 0.8;
    font-size: 1.3rem;
`;

export default function Blog({posts, errorCode, total, totalPages}) {
    if (errorCode) return <Error statusCode={errorCode} />;

    return <Page title="Blog" logoAccent="blogAccent">
        <h1>Blog</h1>
        {posts.map(({id, slug, date, title, content}) => {
            const dateStr = new Date(date).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: typeof window === "undefined" ? "America/New_York" : undefined
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
        {/* <p className="mt-5">{total} records over {totalPages} pages</p> */}
    </Page>;
}

export async function getServerSideProps(ctx) {
    const perPage = 10;
    const page = (ctx.query && ctx.query.page && parseInt(ctx.query.page)) || 1;
    if (Number.isNaN(ctx.query.page) || page < 0) {
        return {
            props: {
                errorCode: 400
            }
        };
    }

    const query = {
        _fields: "id,slug,title,content,date,meta,featured_media,_links",
        per_page: perPage,
        page
    };

    const url = "https://wp.anli.dev/wp-json/wp/v2/posts?" + stringify(query);
    const response = await fetch(url);
    const total = parseInt(response.headers.get("x-wp-total"));
    const totalPages = parseInt(response.headers.get("x-wp-totalpages"));
    const data = await response.json();

    const props = {
        posts: data.map(postData => ({
            id: postData.id,
            slug: postData.slug,
            date: postData.date,
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