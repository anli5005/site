import { Container } from "react-bootstrap";
import data from "quicklinks";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MutedHeading = styled.h3`
    font-size: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-right: ${props => props.theme.spacing.md};
    opacity: 0.8;
    line-height: 3rem;
    margin-bottom: ${props => props.theme.spacing.xs};

    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        display: inline-block;
    }
`;

const QuickLinkContainer = styled.div`
    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        display: inline-flex;
    }
`;

const MutedParagraph = styled.p`
    opacity: 0.6;
`;

const QuickLinkText = styled.span`
    font-family: ${props => props.theme.fonts.heading};
    font-weight: bold;
    font-size: 1.5rem;
    transition: color 0.2s;
`;

const QuickLinkIcon = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    font-size: 2.5rem;
    vertical-align: middle;
    opacity: 0.15;
    transition: opacity 0.2s;
`;

const QuickLinkA = styled.a`
    position: relative;
    z-index: 1;
    min-width: 3rem;
    display: flex;
    margin-bottom: ${props => props.theme.spacing.md};
    align-items: flex-start;

    &:last-child {
        margin-right: 0;
    }

    text-decoration: none;

    &:hover ${QuickLinkIcon} {
        opacity: 0.3;
    }

    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        display: block;
        margin-bottom: 0;
        margin-right: ${props => props.theme.spacing.md};
    }
`;

const QuickLinkSymbol = styled.div`
    width: 3rem;
    position: relative;
    text-align: center;
    color: ${props => props.color || props.theme.colors.link};
    margin-bottom: ${props => props.theme.spacing.sm};
    display: inline-block;
    margin-right: ${props => props.theme.spacing.sm};
    vertical-align: top;

    ${props => props.dark && `@media (prefers-color-scheme: dark) {
        color: ${props.dark};
    }`}

    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        width: auto;
        margin: 0;
        vertical-align: middle;
    }
`;

const QuickLinkDetail = styled.div`
    display: inline-block;
    flex-grow: 1;

    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        position: absolute;
        display: block;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -20px);
        width: auto;
        white-space: nowrap;
        margin-top: ${props => props.theme.spacing.sm};
        z-index: 2;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.2s, transform 0.2s;

        ${QuickLinkA}:hover & {
            visibility: visible;
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }

    color: ${props => props.theme.colors.text};
    
    & > h5, & > p {
        margin-bottom: ${props => props.theme.spacing.xs};
    }
`;

function QuickLink({link: {short, url, icon, name, description, domain, brand}}) {
    return <QuickLinkA href={url}>
        <QuickLinkSymbol color={brand && brand.bg} dark={brand && brand.dark}>
            <QuickLinkIcon>{icon && <FontAwesomeIcon icon={icon} />}</QuickLinkIcon>
            <QuickLinkText>{short}</QuickLinkText>
        </QuickLinkSymbol>
        <QuickLinkDetail>
            <h5>{name}</h5>
            <p>{description}</p>
            <MutedParagraph>{domain}</MutedParagraph>
        </QuickLinkDetail>
    </QuickLinkA>;
}

export default function QuickLinks() {
    return <Container className="text-md-center">
        <MutedHeading>Quick Links</MutedHeading>
        <QuickLinkContainer>
            {data.map(link => <QuickLink link={link} key={link.short} />)}
        </QuickLinkContainer>
    </Container>;
}