import { Container } from "react-bootstrap";
import data from "quicklinks";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MutedHeading = styled.h3`
    font-size: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    display: inline-block;
    margin-right: ${props => props.theme.spacing.md};
    opacity: 0.8;
    line-height: 3rem;
    margin-bottom: ${props => props.theme.spacing.xs};
`;

const QuickLinkContainer = styled.div`
    display: inline-flex;
`;

const QuickLinkA = styled.a`
    margin-right: ${props => props.theme.spacing.md};
    position: relative;
    z-index: 1;
    min-width: 3rem;
    display: block;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        text-decoration: none;
    }
`;

const QuickLinkSymbol = styled.div`
    
`;

const QuickLinkIcon = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    font-size: 2.5rem;
    vertical-align: middle;
    opacity: 0.2;
`;

const QuickLinkText = styled.span`
    font-family: ${props => props.theme.fonts.heading};
    font-weight: bold;
    font-size: 1.5rem;
`;

const QuickLinkDetail = styled.div`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -20px);
    z-index: 2;
    width: auto;
    white-space: nowrap;
    margin-top: ${props => props.theme.spacing.sm};
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
    color: ${props => props.theme.colors.text};

    ${QuickLinkA}:hover & {
        visibility: visible;
        opacity: 1;
        transform: translate(-50%, 0);
    }
    
    & > h5, & > p {
        margin-bottom: ${props => props.theme.spacing.xs};
    }
`;

const MutedParagraph = styled.p`
    opacity: 0.6;
`;

function QuickLink({link: {short, url, icon, name, description, domain}}) {
    return <QuickLinkA href={url}>
        <QuickLinkSymbol>
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
    return <Container className="text-center">
        <MutedHeading>Quick Links</MutedHeading>
        <QuickLinkContainer>
            {data.map(link => <QuickLink link={link} key={link.short} />)}
        </QuickLinkContainer>
    </Container>;
}