import ProjectsPage, { getProjectsProps } from "./page/[page]";

export default ProjectsPage;

export async function getStaticProps() {
    const result = await getProjectsProps(1);
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