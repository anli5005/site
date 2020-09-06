import Page from 'components/Page';
import { Breadcrumb } from 'react-bootstrap';
import Error from 'next/error';
import Link from 'next/link';
import PostContent from 'components/PostContent';
import { PostDate } from 'components/ComponentVarients';
import styled from 'styled-components';

const CustomPostDate = styled(PostDate)`
    margin-bottom: ${props => props.theme.spacing.xl};
`;

export default function SinglePost({errorCode, post}) {
    if (errorCode) return <Error statusCode={errorCode} />;

    const dateStr = new Date(post.date).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: typeof window === "undefined" ? "America/New_York" : undefined
    });

    return <Page logoAccent="blogAccent" title={post.title}>
        <Breadcrumb>
            <Link href="/blog" passHref><Breadcrumb.Item>Blog</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>{post.title}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{post.title}</h1>
        <CustomPostDate>{dateStr}</CustomPostDate>
        <PostContent html={post.content} />
    </Page>;
}

export async function getServerSideProps({params}) {
    const id = params.id && params.id && parseInt(params.id);
    if (!id || Number.isNaN(id) || id < 1) {
        return {
            props: {
                errorCode: 404
            }
        };
    }

    const url = "https://wp.anli.dev/wp-json/wp/v2/posts/" + id + "?_fields=id,slug,title,content,date,meta,featured_media,_links";
    const response = await fetch(url);
    const data = await response.json();

    if (data.data && data.data.status) {
        return {props: {errorCode: data.data.status}};
    }

    if (data.slug !== params.slug) {
        return {props: {errorCode: 404}};
    }

    const props = {
        post: {
            id: data.id,
            slug: data.slug,
            date: data.date,
            title: data.title.rendered,
            content: data.content.rendered
        }
    };

    return {props};
}