import Link from 'next/link';
import Logo from './Logo';
import styled, { ThemeContext } from 'styled-components';
import { transparentize, darken } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown, faInfoCircle, faComment, faBrowser, faAddressBook, faEllipsisH } from "@fortawesome/pro-regular-svg-icons";
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
    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        padding-left: 0.75rem;
    }
`;

const SecondaryNav = styled(({children, isVisible, ...rest}) => <Nav {...rest}>{children}</Nav>)`
    @media (max-width: ${props => props.theme.breakpoints.sm - 1}px) {
        background-color: ${props => props.theme.colors.light.secondaryBackground};
        width: 100%;
        flex-direction: row;
        display: ${props => props.isVisible ? "flex" : "none"};
    }

    @media (max-width: ${props => props.theme.breakpoints.sm - 1}px) and (prefers-color-scheme: dark) {
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
    ${props => props.compact ? `
        font-size: 1.5em;
        line-height: 0.6;
    ` : `
        margin-right: ${props.theme.spacing.xs};
    `}

    height: 1em;

    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        margin-right: ${props => props.theme.spacing.xs};
        font-size: 1em;
        line-height: 1;
    }
`;

const LinkText = styled.span`
    ${props => props.compact ? "font-size: 0.7em;" : ""}
    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        font-size: 1em;
    }
`;

const CustomNavLink = styled(Nav.Link)`
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    &.active {
        font-weight: bold;
    }

    color: ${props => props.theme.colors.textSecondary};

    ${({gradient}) => gradient ? `
        &.active > ${LinkText}, &:hover > ${LinkText} {
            background-image: linear-gradient(to right, ${gradient.join(",")});
            color: ${gradient[0]};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        &.active ${LinkIcon}, &:hover ${LinkIcon} {
            color: ${gradient[0]};
        }
    ` : ""}
`;

const NavExpandLink = styled.a`
    height: 56px;
    line-height: 56px;
`;

function NavigationLink({href, as, children, icon, compact, active, activeIcon, gradient}) {
    let inner;
    const effectiveIcon = (active && activeIcon) || icon;

    if (compact) {
        inner = <CustomNavLink className="d-flex flex-column flex-md-row align-items-center py-2" compact={1} active={active} gradient={gradient}>
            <LinkIcon compact={1}><FontAwesomeIcon icon={effectiveIcon} /></LinkIcon>
            <LinkText compact={1}>{children}</LinkText>
        </CustomNavLink>;
    } else {
        inner = <CustomNavLink active={active} gradient={gradient}>
            <LinkIcon><FontAwesomeIcon icon={effectiveIcon} /></LinkIcon>
            <LinkText>{children}</LinkText>
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
    if (accent) {
        if (typeof theme.colors[accent] === "string") {
            accentColor = transparentize(0.2, theme.colors[accent]);
        } else {
            accentColor = accent;
        }
    }

    return <CustomNavbar className="shadow">
        <Link href="/" passHref><BrandLink><span className="sr-only">Anthony Li </span><Logo size={56} accent={accentColor} /></BrandLink></Link>
        <PrimaryNav className="flex-grow-1 flex-sm-grow-0">
            <NavigationLink
                icon={faInfoCircle}
                activeIcon={fasInfoCircle}
                href="/[page]"
                as="/about"
                active={pathname === "/[page]" && query.page === "about"}
                compact
                gradient={[theme.colors.aboutGradientStart, theme.colors.aboutGradientEnd]}
            >
                About
            </NavigationLink>
            <NavigationLink
                icon={faComment}
                activeIcon={fasComment}
                href="/blog"
                active={pathname === "/blog"}
                compact
                gradient={[theme.colors.blogGradientStart, theme.colors.blogGradientEnd]}
            >
                Blog
            </NavigationLink>
            <NavigationLink
                icon={faBrowser}
                activeIcon={fasBrowser}
                href="/projects"
                active={pathname === "/projects"}
                compact
                gradient={[theme.colors.portfolioGradientStart, theme.colors.portfolioGradientEnd]}
            >
                Portfolio
            </NavigationLink>
        </PrimaryNav>
        {typeof window !== undefined && <NavExpandLink className="d-block d-sm-none px-2 px-sm-3" href="#" onClick={(e) => {
            e.preventDefault();
            setSecondaryNavVisible(!secondaryNavVisible);
        }}><FontAwesomeIcon icon={secondaryNavVisible ? faChevronDown : faChevronRight} /></NavExpandLink>}
        <SecondaryNav isVisible={secondaryNavVisible}>
            <NavigationLink
                icon={faAddressBook}
                activeIcon={fasAddressBook}
                href="/[page]" 
                as="/contact"
                active={pathname === "/[page]" && query.page === "contact"}
                compact
                gradient={[theme.colors.contactGradientStart, theme.colors.contactGradientEnd]}
            >
                Contact
            </NavigationLink>
            <NavigationLink
                icon={faEllipsisH}
                activeIcon={fasEllipsisH}
                href="/misc"
                active={pathname === "/misc"}
                compact
                gradient={[theme.colors.moreGradientStart, theme.colors.moreGradientEnd]}
            >
                Misc
            </NavigationLink>
        </SecondaryNav>
    </CustomNavbar>
}
