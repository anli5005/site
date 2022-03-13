import Page from 'components/Page';
import PostContent from 'components/PostContent';
import { TitleHeader } from 'components/TitleHeader';

import { stringify } from 'querystring';
import { ErrorComponent } from './_error';

export default function PagePage({title, errorCode, content, logoAccent}) {
    if (errorCode) return <ErrorComponent statusCode={errorCode} />;

    const html = content;

    return <Page title={title} logoAccent={logoAccent}>
        <TitleHeader>{title}</TitleHeader>
        <PostContent html={html} />
    </Page>;
}

export async function getServerSideProps({params: {page}, res}) {
    const query = {
        slug: page,
        _fields: "title,content,meta,featured_media,anli_logo_accent_color"
    };

    const url = "https://wp.anli.dev/wp-json/wp/v2/pages?" + stringify(query);

    const data = await (await fetch(url)).json();

    if (data.length === 0) {
        res.statusCode = 404;
        return {props: {errorCode: 404}}
    }

    return {props: {
        title: data[0].title.rendered,
        content: data[0].content.rendered,
        logoAccent: data[0].anli_logo_accent_color
    }};
}