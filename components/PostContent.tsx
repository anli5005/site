import Router from 'next/router';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import OneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import React from 'react';

const parser = new Parser();

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
            return <SyntaxHighlighter className="syntax-highlighted-code" style={OneDark} language={code.props.className.split(" ").find((c: string) => c.startsWith("language-")).slice("language-".length)}>
                {content}
            </SyntaxHighlighter>
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