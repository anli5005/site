import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { Container } from "react-bootstrap";
import styled from "styled-components";

const FooterContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.colors.textMuted};

    padding-top: ${props => props.theme.spacing.md};
    padding-bottom: ${props => props.theme.spacing.md};

    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        flex-direction: row;
        justify-content: space-between;
        padding-top: ${props => props.theme.spacing.xl};
        padding-bottom: ${props => props.theme.spacing.xl};
    }
`;

export const FooterList = styled.ul`
    list-style-type: none;
    display: block;
    padding: 0;

    & > li {
        display: inline;
        border-right: 1px solid ${props => props.theme.colors.textMuted};
        padding-right: 8px;
        padding-left: 8px;
    }

    & > li:first-child {
        padding-left: 0;
    }

    & > li:last-child {
        padding-right: 0;
        border-right: 0;
    }
`;

export default function Footer() {
    return <footer>
        <FooterContainer>
            <FooterList>
                <li><a href="https://github.com/anli5005/site">Made with <FontAwesomeIcon icon={faHeart} /></a><span className="sr-only">love</span></li>
                <li>&copy; 2021 Anthony Li</li>
            </FooterList>
            <FooterList>
                <li><Link href="/[page]" as="/about"><a>About</a></Link></li>
                <li><Link href="/[page]" as="/attribution"><a>Attribution</a></Link></li>
                <li><a href="https://github.com/anli5005">GitHub</a></li>
            </FooterList>
        </FooterContainer>
    </footer>
}