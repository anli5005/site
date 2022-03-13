import Router from 'next/router';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import OneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import React from 'react';

const parser = new Parser();

const processingInstructions = [
    {
        shouldProcessNode: ({name, children}) => {
            return name === "pre" &&
                children &&
                children.length === 1 &&
                children[0].name === "code" &&
                children[0].attribs &&
                children[0].attribs["class"] &&
                children[0].attribs["class"].split(" ").find(c => c.startsWith("language-")) &&
                children[0].children &&
                children[0].children.length === 1 &&
                children[0].children[0].type === "text";
        },
        processNode: ({attribs}, children) => {
            const code = children[0];
            let content = code.props.children;
            if (content.endsWith("\n")) {
                content = content.slice(0, -1);
            }
            return <SyntaxHighlighter className="syntax-highlighted-code border border-ocean-200 dark:border-gray-600" style={OneDark} language={code.props.className.split(" ").find(c => c.startsWith("language-")).slice("language-".length)}>
                {content}
            </SyntaxHighlighter>
        }
    },
    {
        shouldProcessNode: _ => true,
        processNode: new ProcessNodeDefinitions(React).processDefaultNode
    }
];

function isValidNode() {
    return true;
}

export default function PostContent({html}) {
    const tree = parser.parseWithInstructions(html, isValidNode, processingInstructions);
    return <div className="prose prose-ocean dark:prose-invert hover:prose-a:text-ocean-600 hover:prose-a:dark:text-ocean-200 prose-a:transition-colors max-w-none" onClick={(e) => {
        const link = e.target.closest(".page-content a");
        if (link) {
            if (link.host === location.host) {
                e.preventDefault();
                Router.push((link.pathname || "/") + (link.query || "") + (link.hash || ""));
            }
        }
    }}>{tree}</div>;
}