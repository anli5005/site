import BlogPage, { getBlogProps } from "./page/[page]";

export default BlogPage;

export async function getStaticProps() {
    const result = await getBlogProps(1);
    const revalidate = 15;
    if ("notFound" in result) {
        if (result.shouldRevalidate) {
            return {
                notFound: true,
                revalidate,
            };
        } else {
            return {
                notFound: true,
            };
        }
    } else {
        return {
            props: result.props,
            revalidate,
        };
    }
}