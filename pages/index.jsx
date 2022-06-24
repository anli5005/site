import { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from 'components/Logo';
import styled, { useTheme, ThemeContext } from 'styled-components';
import { NextSeo } from 'next-seo';
import { faInfoCircle, faArrowRight, faComment, faBrowser, faEllipsisH, faExternalLink } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Footer, { FooterList } from 'components/Footer';
import QuickLinks from 'components/QuickLinks';
import { transparentize } from 'polished';

const BigRoundedBox = styled.div`
    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        border-radius: 32px;
    }

    border-radius: 16px;
    background-color: ${props => props.theme.colors.secondaryBackground};
    color: ${props => props.theme.colors.primary};

    @media (prefers-color-scheme: dark) {
        color: ${props => props.theme.colors.dark.text};
    }
`;

const NameHeader = styled.div`
    @media (max-width: ${props => props.theme.breakpoints.md - 1}px) {
        font-size: 2.5rem;
    }
`;

const SomewhatDeemphasizedText = styled.div`
    color: ${props => props.theme.colors.link};
`;

const LinksRow = styled(Row)`
    --bs-gutter-x: ${props => props.theme.spacing.md};
    --bs-gutter-y: ${props => props.theme.spacing.md};
`;

const LinksContainer = styled.div`
    border-radius: 16px;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.secondaryBackground};
    overflow: hidden;
`;

const LinksTitle = styled.a`
    font-family: ${props => props.theme.fonts.heading};
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: block;
    width: 100%;
    text-decoration: none;
    background-color: ${props => props.theme.colors.darkBackground};
    color: white;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    ${({gradient}) => {
        return gradient ? `background: linear-gradient(to right, ${gradient.map(color => transparentize(0.17, color)).join(",")});` : "";
    }}

    & > svg:first-child {
        width: 1em;
    }

    & > svg:last-child {
        position: relative;
        left: 0;
        transition: left 0.2s;
    }

    &:hover, &:active, &:focus {
        color: white;
        & > svg:last-child {
            left: 4px;
        }
        ${({gradient}) => gradient ? `
            background: linear-gradient(to right, ${gradient.join(",")});
        ` : ""}
    }
`;

const LinksList = styled.ul`
    margin-bottom: 0;
    list-style: none;
    padding: ${props => props.theme.spacing.md};

    & > li > a {
        text-decoration: none;
    }

    & > li > a:hover, & > li > a:active, & > li > a:focus {
        text-decoration: underline;
    }
`;

function Links({icon, title, links, href, as, gradient}) {
    return <Col xs={12} md={6}>
        <LinksContainer>
            <Link href={href} as={as} passHref><LinksTitle gradient={gradient}><FontAwesomeIcon className="me-2" icon={icon} />{title}<FontAwesomeIcon className="ms-2" icon={faArrowRight} /></LinksTitle></Link>
            {links && <LinksList>
                {links.map(({ content, href, as, type }, index) => {
                    const inner = <Fragment>{content}</Fragment>

                    return <li key={index}>
                        {type === "external" ? <a href={href}>{inner}</a> : <Link href={href} as={as}><a>{inner}</a></Link>}
                    </li>;
                })}
            </LinksList>}
        </LinksContainer>
    </Col>;
}

export default function Home({posts, projects}) {
    const {colors} = useTheme(ThemeContext);
    
    return <Fragment>
        <NextSeo title="Anthony Li • anli5005 - Developer, Designer, Entrepreneur" openGraph={{
            title: "Anthony Li (anli5005) - Developer, Designer, Entrepreneur",
            url: "https://anli.dev",
            description: "The homepage of Anthony Li, or anli5005. Making random stuff, some of which might be helpful or entertaining. UPenn M&T '26"
        }} description="The homepage of Anthony Li, or anli5005. Making random stuff, some of which might be helpful or entertaining. UPenn M&T '26" />
        <Container className="px-3 my-3 mt-sm-5 mb-sm-4">
            <BigRoundedBox className="py-4 py-sm-5 px-3 px-md-5 d-flex flex-column flex-md-row align-items-center justify-content-center">
                <Logo className="flex-grow-0 flex-shrink-0" size={150} circle />
                <div className="ms-md-5 mt-3 mt-md-0 text-center text-md-start">
                    <h1>
                        <NameHeader className="mb-0">Anthony Li</NameHeader>
                        <SomewhatDeemphasizedText className="h4 mb-4">anli5005</SomewhatDeemphasizedText>
                    </h1>
                    <p>I'm a maker, programmer, and entrepreneur. Some of my stuff might be helpful or entertaining. BCA ATCS '22</p>
                    <FooterList>
                        <li>
                            <a href="https://github.com/anli5005">GitHub<FontAwesomeIcon className="ms-2" icon={faExternalLink} /></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/anli5005">Twitter<FontAwesomeIcon className="ms-2" icon={faExternalLink} /></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/anlidev/">LinkedIn<FontAwesomeIcon className="ms-2" icon={faExternalLink} /></a>
                        </li>
                    </FooterList>
                </div>
            </BigRoundedBox>
        </Container>
        <Container className="mb-5 px-3">
            <LinksRow>
                <Links icon={faInfoCircle} title="About" href="/[page]" as="/about" links={[
                    {content: "Contact", href: "/[page]", as: "/about#contact"}
                ]} gradient={colors.homepageGradients.about} />
                <Links icon={faComment} title="Blog" href="/blog" gradient={colors.homepageGradients.blog} links={posts.map(post => ({
                    content: post.title,
                    href: "/blog/[id]/[slug]",
                    as: `/blog/${post.id}/${post.slug}`
                }))} />
                <Links icon={faBrowser} title="Portfolio" href="/projects" gradient={colors.homepageGradients.portfolio} links={projects.map(project => ({
                    content: project.title,
                    href: "projects/[slug]",
                    as: `/projects/${project.slug}`
                }))} />
                <Links icon={faEllipsisH} title="Misc" href="/misc" gradient={colors.homepageGradients.more} links={[
                    {content: "Class Notes", href: "/classnotes"},
                    {content: "UNIX Timestamper", href: "/timestamper"}
                ]} />
            </LinksRow>
        </Container>
        <div className="mb-5">
            <QuickLinks />
        </div>
        <Footer />
    </Fragment>;
}

export async function getStaticProps(ctx) {
    const postURL = "https://wp.anli.dev/wp-json/wp/v2/posts?_fields=id,slug,title&per_page=5";
    const projectURL = "https://wp.anli.dev/wp-json/wp/v2/project?_fields=slug,title&per_page=5"
    const [postResponse, projectResponse] = await Promise.all([fetch(postURL), fetch(projectURL)]);
    const postData = await postResponse.json();
    const projectData = await projectResponse.json();

    const props = {
        posts: postData.map(post => ({
            id: post.id,
            slug: post.slug,
            title: post.title.rendered,
        })),
        projects: projectData.map(project => ({
            slug: project.slug,
            title: project.title.rendered
        }))
    };

    return {props, revalidate: 10};
}
