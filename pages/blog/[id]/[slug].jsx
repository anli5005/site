import Page from 'components/Page';
import { Breadcrumb } from 'react-bootstrap';
import Link from 'next/link';
import PostContent from 'components/PostContent';
import { PostDate } from 'components/ComponentVarients';
import styled from 'styled-components';
import { DateTime } from 'luxon';

const CustomPostDate = styled(PostDate)`
    margin-bottom: ${props => props.theme.spacing.xl};
`;

export default function SinglePost({errorCode, post}) {
    if (errorCode) return <ErrorComponent statusCode={errorCode} />;

    const dateStr = DateTime.fromISO(post.date, {zone: "utc"}).setZone(typeof window === "undefined" ? "America/New_York" : "local").toLocaleString({
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return <Page logoAccent="blogAccent" title={post.title}>
        <Breadcrumb>
            <Link href="/blog" passHref><Breadcrumb.Item>Blog</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>{post.title}</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="mt-5">{post.title}</h1>
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

    const url = "https://wp.anli.dev/wp-json/wp/v2/posts/" + id + "?_fields=id,slug,title,content,date_gmt,meta,featured_media,_links";
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
            date: data.date_gmt,
            title: data.title.rendered,
            content: data.content.rendered
        }
    };

    return {props};
}