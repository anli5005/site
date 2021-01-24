import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Logo from 'components/Logo';
import styled, { useTheme, ThemeContext } from 'styled-components';
import { NextSeo } from 'next-seo';
import { faInfoCircle, faArrowRight, faComment, faBrowser, faAddressBook, faEllipsisH, faExternalLink } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Footer, { FooterList } from 'components/Footer';
import QuickLinks from 'components/QuickLinks';

const HalfOpacity = styled.span`
    opacity: 0.5;
`;

const BigRoundedBox = styled.div`
    border-radius: 32px;
    background-color: ${props => props.theme.colors.secondaryBackground};
    color: ${props => props.theme.colors.primary};

    @media (prefers-color-scheme: dark) {
        color: ${props => props.theme.colors.dark.text};
    }
`;

const NameHeader = styled.h1`
    @media (max-width: ${props => props.theme.breakpoints.md - 1}px) {
        font-size: 2.5rem;
    }
`;

const SomewhatDeemphasizedText = styled.p`
    color: ${props => props.theme.colors.link};
`;

const LinksContainer = styled.div`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    width: 100%;

    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        padding: ${props => props.theme.spacing.lg};
        width: auto;
        min-width: 280px;
        flex-grow: 1;
        display: flex;
        justify-content: center;
    }
`;

const LinksTitle = styled.a`
    font-size: 1.2em;
    display: block;
    margin-bottom: ${props => props.theme.spacing.xs};
    display: inline-block;
    ${({gradient, theme}) => gradient ? `
        color: ${theme.colors.text};
        background-image: linear-gradient(to right, ${gradient.join(",")});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    ` : ""}

    & > svg:first-child {
        width: 1em;
        ${props => props.gradient ? `color: ${props.gradient[0]};` : ""}
    }

    & > svg:last-child {
        ${props => props.gradient ? `color: ${props.gradient[1]};` : ""}
    }

    &:hover {
        ${props => props.gradient ? `
            @media (prefers-color-scheme: dark) {
                -webkit-text-fill-color: rgba(255, 255, 255, 0.4);
            }

            -webkit-text-fill-color: rgba(0, 0, 0, 0.2);
        ` : ""}
    }
`;

const LinksList = styled.ul`
    margin-bottom: 0;
    list-style: none;
    padding-left: 1.7em;

    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        & > li {
            font-size: 0.9em;
        }
    }
`;

function Links({icon, title, links, href, as, gradient}) {
    return <LinksContainer>
        <div>
            <Link href={href} as={as} passHref><LinksTitle gradient={gradient}><FontAwesomeIcon className="mr-2" icon={icon} />{title}<FontAwesomeIcon className="ml-2" icon={faArrowRight} /></LinksTitle></Link>
            {links && <LinksList>
                {links.map(({content, href, as, type}, index) => {
                    const inner = <Fragment>{content}</Fragment>

                    return <li key={index}>
                        {type === "external" ? <a href={href}>{inner}</a> : <Link href={href} as={as}><a>{inner}</a></Link>}
                    </li>;
                })}
            </LinksList>}
        </div>
    </LinksContainer>;
}

export default function Home({posts, projects}) {
    const {colors} = useTheme(ThemeContext);
    
    return <Fragment>
        <NextSeo title="Anthony Li (anli) - Developer, Designer, Entrepreneur" openGraph={{
            title: "Anthony Li (anli) - Developer, Designer, Entrepreneur",
            url: "https://anli.dev",
            description: "I make random stuff. Some of said stuff might be helpful or entertaining. BCA ATCS '22"
        }} description="I make random stuff. Some of said stuff might be helpful or entertaining. BCA ATCS '22" />
        <Container className="px-3 my-3 my-sm-5">
            <BigRoundedBox className="py-4 py-sm-5 px-3 px-md-5 px-lg-3 d-flex flex-column flex-md-row align-items-center justify-content-center">
                <Logo className="flex-grow-0 flex-shrink-0" size={150} circle />
                <div className="ml-md-5 mt-3 mt-md-0 text-center text-md-left">
                    <NameHeader className="mb-0">Anthony Li</NameHeader>
                    <SomewhatDeemphasizedText className="h4 mb-4">anli<HalfOpacity>5005</HalfOpacity></SomewhatDeemphasizedText>
                    <p>I make random stuff. Some of said stuff might be helpful or entertaining. BCA ATCS '22</p>
                    <FooterList>
                        <li>
                            <a href="https://github.com/anli5005">GitHub<FontAwesomeIcon className="ml-2" icon={faExternalLink} /></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/anli5005">Twitter<FontAwesomeIcon className="ml-2" icon={faExternalLink} /></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/anlidev/">LinkedIn<FontAwesomeIcon className="ml-2" icon={faExternalLink} /></a>
                        </li>
                    </FooterList>
                </div>
            </BigRoundedBox>
        </Container>
        <Container className="mb-5 px-0">
            <div className="d-flex w-100 flex-wrap justify-content-center">
                <Links icon={faInfoCircle} title="About" href="/[page]" as="/about" links={[
                    // {content: "Resumé", href: "/[page]", as: "/resume"}
                ]} gradient={[colors.aboutGradientStart, colors.aboutGradientEnd]} />
                <Links icon={faComment} title="Blog" href="/blog" gradient={[colors.blogGradientStart, colors.blogGradientEnd]} links={posts.map(post => ({
                    content: post.title,
                    href: "/blog/[id]/[slug]",
                    as: `/blog/${post.id}/${post.slug}`
                }))} />
                <Links icon={faBrowser} title="Portfolio" href="/projects" gradient={[colors.portfolioGradientStart, colors.portfolioGradientEnd]} links={projects.map(project => ({
                    content: project.title,
                    href: "projects/[slug]",
                    as: `/projects/${project.slug}`
                }))} />
                <Links icon={faAddressBook} title="Contact" href="/[page]" as="/contact" links={[
                    {content: "Email", href: "mailto:me@anli.dev", type: "external"}
                ]} gradient={[colors.contactGradientStart, colors.contactGradientEnd]} />
                <Links icon={faEllipsisH} title="Misc" href="/misc" gradient={[colors.moreGradientStart, colors.moreGradientEnd]} />
            </div>
        </Container>
        <div className="mb-5">
            <QuickLinks />
        </div>
        <Footer />
    </Fragment>;
}

export async function getServerSideProps(ctx) {
    const postURL = "https://wp.anli.dev/wp-json/wp/v2/posts?_fields=id,slug,title&per_page=3";
    const projectURL = "https://wp.anli.dev/wp-json/wp/v2/project?_fields=slug,title&per_page=3"
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

    return {props};
}