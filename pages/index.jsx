import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Logo from 'components/Logo';
import styled, { useTheme, ThemeContext } from 'styled-components';
import Head from 'next/head';
import { faInfoCircle, faArrowRight as falArrowRight, faComment, faBrowser, faAddressBook } from '@fortawesome/pro-light-svg-icons';
import { faArrowRight, faEllipsisH } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

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
        color: ${theme.colors.primaryBackground};
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
`;

const LinksList = styled.ul`
    margin-bottom: 0;
    list-style: none;
    padding-left: 1.7em;

    & > li {
        font-size: 0.9em;
    }
`;

function Links({icon, title, links, href, as, gradient}) {
    return <LinksContainer>
        <div>
            <Link href={href} as={as} passHref><LinksTitle gradient={gradient}><FontAwesomeIcon className="mr-2" icon={icon} />{title}<FontAwesomeIcon className="ml-2" icon={falArrowRight} /></LinksTitle></Link>
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

export default function Home() {
    const {colors} = useTheme(ThemeContext);
    
    return <Fragment>
        <Head>
            <title>Anthony Li (anli) - Developer, Designer, Entrepreneur</title>
        </Head>
        <Container className="px-3 my-3 my-sm-5">
            <BigRoundedBox className="py-5 px-5 px-lg-3 d-flex flex-column flex-md-row align-items-center justify-content-center">
                <Logo className="flex-grow-0 flex-shrink-0" size={150} circle />
                <div className="ml-md-5 mt-3 mt-md-0 text-center text-md-left">
                    <h1 className="mb-0">Anthony Li</h1>
                    <SomewhatDeemphasizedText className="h4 mb-4">anli<HalfOpacity>5005</HalfOpacity></SomewhatDeemphasizedText>
                    <p>I make random stuff. Some of said stuff might be helpful or entertaining. BCA ATCS '22</p>
                </div>
            </BigRoundedBox>
        </Container>
        <Container className="mb-5 px-0">
            <div className="d-flex w-100 flex-wrap justify-content-center">
                <Links icon={faInfoCircle} title="About" href="/[page]" as="/about" links={[
                    {content: "Resumé", href: "/[page]", as: "/resume"}
                ]} gradient={[colors.aboutGradientStart, colors.aboutGradientEnd]} />
                <Links icon={faComment} title="Blog" href="/blog" gradient={[colors.blogGradientStart, colors.blogGradientEnd]} />
                <Links icon={faBrowser} title="Portfolio" href="/projects" gradient={[colors.portfolioGradientStart, colors.portfolioGradientEnd]} />
                <Links icon={faAddressBook} title="Contact" href="/[page]" as="/contact" links={[
                    {content: "Email", href: "mailto:me@anli.dev", type: "external"}
                ]} gradient={[colors.contactGradientStart, colors.contactGradientEnd]} />
                <Links icon={faEllipsisH} title="More" href="/more" gradient={[colors.moreGradientStart, colors.moreGradientEnd]} />
            </div>
        </Container>
    </Fragment>;
}
