import Link from 'next/link';
import Logo from './Logo';
import styled from 'styled-components';
import { transparentize, darken } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from 'react-bootstrap';

const CustomNavbar = styled.nav`
    background-color: ${props => transparentize(0.2, props.theme.colors.light.secondaryBackground)};
    padding: 0;
    border-radius: 6px;
    overflow: hidden;
    backdrop-filter: blur(5px);
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    @media (prefers-color-scheme: dark) {
        background-color: ${props => transparentize(0.2, props.theme.colors.dark.secondaryBackground)};
    }
`;

export default function Navigation() {
    return <CustomNavbar className="shadow">
        <Link href="/"><a><Logo size={56} /></a></Link>
        <Nav>
            <Link passHref href="/[page]" as="/about"><Nav.Link>About</Nav.Link></Link>
            <Link passHref href="/blog"><Nav.Link>Blog</Nav.Link></Link>
            <Link passHref href="/projects"><Nav.Link>Portfolio</Nav.Link></Link>
        </Nav>
        <Nav>
            <Link passHref href="/contact"><Nav.Link>Contact</Nav.Link></Link>
            <Link passHref href="/more"><Nav.Link>More</Nav.Link></Link>
        </Nav>
    </CustomNavbar>
}