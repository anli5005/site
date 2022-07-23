import Router from 'next/router';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import oneLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light';
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/hljs/night-owl';
import React, { PropsWithChildren, useEffect, useState } from 'react';

const parser = new Parser();
const lightModeMediaQuery = "(prefers-color-scheme: light)";

function SyntaxHighlightedCode({ language, children }: { language: string, children: string }) {
    const [isLight, setLight] = useState(typeof window !== "undefined" && window.matchMedia && window.matchMedia(lightModeMediaQuery).matches);

    useEffect(() => {
        if (typeof window !== "undefined" && (window as { matchMedia?: Window["matchMedia"] }).matchMedia) {
            const listener = (event: MediaQueryListEvent) => {
                setLight(event.matches);
            };
            
            const watcher = window.matchMedia(lightModeMediaQuery);
            watcher.addEventListener("change", listener);
            return () => watcher.removeEventListener("change", listener);
        }
    }, []);

    const style = isLight ? oneLight : nightOwl;

    return <SyntaxHighlighter className="syntax-highlighted-code border dark:border-gray-700 rounded w-fit" style={style} language={language}>
        {children}
    </SyntaxHighlighter>;
}

const processingInstructions = [
    {
        shouldProcessNode: ({ name, children }: any) => {
            return name === "pre" &&
                children &&
                children.length === 1 &&
                children[0].name === "code" &&
                children[0].attribs &&
                children[0].attribs["class"] &&
                children[0].attribs["class"].split(" ").find((c: string) => c.startsWith("language-")) &&
                children[0].children &&
                children[0].children.length === 1 &&
                children[0].children[0].type === "text";
        },
        processNode: (_: any, children: any[]) => {
            const code = children[0];
            let content = code.props.children;
            if (content.endsWith("\n")) {
                content = content.slice(0, -1);
            }
            return <SyntaxHighlightedCode language={code.props.className.split(" ").find((c: string) => c.startsWith("language-")).slice("language-".length)}>
                {content}
            </SyntaxHighlightedCode>
        },
    },
    {
        shouldProcessNode: () => true,
        processNode: new ProcessNodeDefinitions(React).processDefaultNode,
    },
];

function isValidNode() {
    return true;
}

export default function PostContent({ html }: { html: string }) {
    const tree = parser.parseWithInstructions(html, isValidNode, processingInstructions);
    return <div className="page-content" onClick={e => {
        const target = e.target as HTMLDivElement;
        const link = target.closest(".page-content a") as HTMLAnchorElement;
        if (link) {
            if (link.host === location.host) {
                e.preventDefault();
                Router.push((link.pathname || "/") + (link.search || "") + (link.hash || ""));
            }
        }
    }}>{tree}</div>;
}