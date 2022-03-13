import { Container } from "react-bootstrap";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Fragment } from "react";
import styled from "styled-components";
import { transparentize } from "polished";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const NavigationBox = styled.div`
    height: 88px;
    padding: 16px 0;
    z-index: 101;
`;

const GradientBox = styled(NavigationBox)`
    background-image: linear-gradient(to bottom, ${props => props.theme.colors.light.primaryBackground} 18%, ${props => transparentize(0.7, props.theme.colors.light.primaryBackground)} 70%, ${props => transparentize(1, props.theme.colors.light.primaryBackground)});
    pointer-events: none;
    z-index: 100;

    @media (prefers-color-scheme: dark) {
        background-image: linear-gradient(to bottom, ${props => props.theme.colors.dark.primaryBackground} 18%, ${props => transparentize(0.7, props.theme.colors.dark.primaryBackground)} 70%, ${props => transparentize(1, props.theme.colors.dark.primaryBackground)});
    }
`;

export default function Page({children, title, logoAccent, openGraph, noindex}) {
    const router = useRouter();

    return <Fragment>
        <NextSeo title={title && `${title} - Anthony Li (anli5005)`} openGraph={{
            title,
            url: "https://anli.dev" + (router.asPath || ""),
            ...openGraph
        }} noindex={noindex} />
        <div className="fixed top-0 left-0 right-0 pointer-events-none h-32 z-30 bg-gradient-to-b from-white via-white/90 to-white/0 dark:from-ocean-1000 dark:via-ocean-1000/90 dark:to-ocean-1000/0" />
        <div className="fixed top-0 left-0 right-0 z-40">
            <div className="container mx-auto px-6 pt-4">
                <Navigation accent={logoAccent} />
            </div>
        </div>
        <div className="px-6 mb-5 mt-32 container mx-auto">
            {children}
        </div>
        <Footer />
    </Fragment>
};
