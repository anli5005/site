import Link from 'next/link';
import Logo from './Logo';
import styled, { ThemeContext } from 'styled-components';
import { transparentize, darken } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import { faInfoCircle, faComment, faBrowser, faAddressBook, faEllipsisH } from "@fortawesome/pro-light-svg-icons";
import { faInfoCircle as fasInfoCircle, faComment as fasComment, faBrowser as fasBrowser, faAddressBook as fasAddressBook, faEllipsisH as fasEllipsisH } from "@fortawesome/pro-solid-svg-icons";
import { Nav } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';

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

const PrimaryNav = styled(Nav)`
    padding-left: 0.5rem;

    @media (min-width: ${props => props.theme.breakpoints.sm}px) {
        padding-left: 0.75rem;
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

    &.active {
        font-weight: bold;
    }
`;

function NavigationLink({href, as, children, icon, compact, active, activeIcon}) {
    let inner;
    const effectiveIcon = (active && activeIcon) || icon;

    if (compact) {
        inner = <CustomNavLink className="d-flex flex-column flex-sm-row align-items-center py-2" active={active}>
            <LinkIcon><FontAwesomeIcon icon={effectiveIcon} /></LinkIcon>
            <LinkText>{children}</LinkText>
        </CustomNavLink>;
    } else {
        inner = <CustomNavLink active={active}>
            <FontAwesomeIcon className="mr-1" icon={effectiveIcon} />
            {children}
        </CustomNavLink>;
    }
    
    return <Link passHref href={href} as={as}>
        {inner}
    </Link>;
}

export default function Navigation({accent}) {
    const [secondaryNavVisible, setSecondaryNavVisible] = useState(false);
    const {query, pathname} = useRouter();
    const theme = useContext(ThemeContext);

    let accentColor;
    if (accent && typeof theme.colors[accent] === "string") {
        accentColor = transparentize(0.2, theme.colors[accent]);
    }

    return <CustomNavbar className="shadow">
        <Link href="/"><BrandLink><Logo size={56} accent={accentColor} /></BrandLink></Link>
        <PrimaryNav className="flex-grow-1 flex-md-grow-0">
            <NavigationLink icon={faInfoCircle} activeIcon={fasInfoCircle} href="/[page]" as="/about" active={pathname === "/[page]" && query.page === "about"} compact>About</NavigationLink>
            <NavigationLink icon={faComment} activeIcon={fasComment} href="/blog" active={pathname === "/blog"} compact>Blog</NavigationLink>
            <NavigationLink icon={faBrowser} activeIcon={fasBrowser} href="/projects" active={pathname === "/projects"} compact>Portfolio</NavigationLink>
        </PrimaryNav>
        {typeof window !== undefined && <a className="d-block d-md-none pr-2 pr-sm-3" href="#" onClick={(e) => {
            e.preventDefault();
            setSecondaryNavVisible(!secondaryNavVisible);
        }}><FontAwesomeIcon icon={secondaryNavVisible ? faChevronDown : faChevronRight} /></a>}
        <SecondaryNav visible={secondaryNavVisible}>
            <NavigationLink icon={faAddressBook} activeIcon={fasAddressBook} href="/[page]" as="/contact" active={pathname === "/[page]" && query.page === "contact"}>Contact</NavigationLink>
            <NavigationLink icon={faEllipsisH} activeIcon={fasEllipsisH} href="/more" active={pathname === "/more"}>More</NavigationLink>
        </SecondaryNav>
    </CustomNavbar>
}