import Link from 'next/link';
import Logo from './Logo';
import styled from 'styled-components';
import { transparentize, darken } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown, faInfoCircle, faComment, faBrowser, faAddressBook, faEllipsisH } from "@fortawesome/pro-regular-svg-icons";
import { Nav } from 'react-bootstrap';
import { useState, Fragment } from 'react';

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

const SecondaryNav = styled(Nav)`
    @media (max-width: ${props => props.theme.breakpoints.md - 1}px) {
        background-color: ${props => darken(0.1, props.theme.colors.light.secondaryBackground)};
        width: 100%;
        flex-direction: column;
        display: ${props => props.visible ? "flex" : "none"};
    }

    @media (max-width: ${props => props.theme.breakpoints.md - 1}px) and (prefers-color-scheme: dark) {
        background-color: ${props => darken(0.1, props.theme.colors.dark.secondaryBackground)};
    }
`;

const BrandLink = styled.a`
    &:hover {
        text-decoration: none;
        opacity: 0.6;
    }

    cursor: pointer;
`;

const LinkIcon = styled.span`
    font-size: 1.5em;
    line-height: 0.6;

    @media (min-width: ${props => props.theme.breakpoints.sm}px) {
        margin-right: ${props => props.theme.spacing.xs};
        font-size: 1em;
        line-height: 1;
    }
`;

const LinkText = styled.span`
    font-size: 0.7em;

    @media (min-width: ${props => props.theme.breakpoints.sm}px) {
        font-size: 1em;
    }
`;

const CustomNavLink = styled(Nav.Link)`
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    @media (min-width: ${props => props.theme.breakpoints.sm}px) {
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

function NavigationLink({href, as, children, icon, compact}) {
    let inner;

    if (compact) {
        inner = <CustomNavLink className="d-flex flex-column flex-sm-row align-items-center py-0">
            <LinkIcon><FontAwesomeIcon icon={icon} /></LinkIcon>
            <LinkText>{children}</LinkText>
        </CustomNavLink>;
    } else {
        inner = <CustomNavLink>
            <FontAwesomeIcon className="mr-1" icon={icon} />
            {children}
        </CustomNavLink>;
    }
    
    return <Link passHref href={href} as={as}>
        {inner}
    </Link>;
}

export default function Navigation() {
    const [secondaryNavVisible, setSecondaryNavVisible] = useState(false);

    return <CustomNavbar className="shadow">
        <Link href="/"><BrandLink><Logo size={56} /></BrandLink></Link>
        <Nav className="flex-grow-1 flex-md-grow-0">
            <NavigationLink icon={faInfoCircle} href="/[page]" as="/about" compact>About</NavigationLink>
            <NavigationLink icon={faComment} href="/blog" compact>Blog</NavigationLink>
            <NavigationLink icon={faBrowser} href="/projects" compact>Portfolio</NavigationLink>
        </Nav>
        {typeof window !== undefined && <a className="d-block d-md-none pr-2 pr-sm-3" href="#" onClick={(e) => {
            e.preventDefault();
            setSecondaryNavVisible(!secondaryNavVisible);
        }}><FontAwesomeIcon icon={secondaryNavVisible ? faChevronDown : faChevronRight} /></a>}
        <SecondaryNav visible={secondaryNavVisible}>
            <NavigationLink icon={faAddressBook} href="/[page]" as="/contact">Contact</NavigationLink>
            <NavigationLink icon={faEllipsisH} href="/more">More</NavigationLink>
        </SecondaryNav>
    </CustomNavbar>
}