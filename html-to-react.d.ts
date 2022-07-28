import React, { ReactNode } from "react";

declare module 'html-to-react' {
    class ProcessNodeDefinitions {
        constructor(react: React);
        processDefaultNode: any;
    }

    interface ProcessingInstruction {
        shouldProcessNode(node: any): boolean;
        processNode(node: any, children: any[]): any;
    }

    class Parser {
        parse(html: string): ReactNode;
        parseWithInstructions(html: string, isValidNode: (node: any) => boolean, processingInstructions: ProcessingInstruction[]): ReactNode;
    }
}