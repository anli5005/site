import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import { forwardRef, HTMLProps, PropsWithChildren, PropsWithRef, Ref } from "react";

function FooterList({ children }: PropsWithChildren<{}>) {
    return <ul className="list-none block p-0">
        {children}
    </ul>;
}

function FooterListItem({ children }: PropsWithChildren<{}>) {
    return <li className="inline border-r contrast-more:border-r-2 px-2 first:pl-0 last:pr-0 last:border-r-0 border-slate-400 dark:border-slate-500 contrast-more:border-black dark:contrast-more:border-white">
        {children}
    </li>;
}

const FooterLink = forwardRef(({ children, ...props }: HTMLProps<HTMLAnchorElement>, ref: Ref<HTMLAnchorElement>) => {
    return <a {...props} ref={ref} className={classNames(
        "text-slate-500 contrast-more:text-ocean-700 underline decoration-slate-400 contrast-more:decoration-ocean-700 dark:decoration-slate-500 dark:contrast-more:decoration-ocean-100 dark:text-slate-400 dark:contrast-more:text-ocean-100",
        "hover:text-slate-600 hover:decoration-slate-600 active:text-slate-700 dark:hover:text-slate-300 dark:hover:decoration-slate-300 dark:active:text-slate-200"
    )}>
        {children}
    </a>
});

function FooterSocial({ children, className, ...props }: HTMLProps<HTMLAnchorElement>) {
    return <a {...props} className={
        classNames("text-xl text-slate-500 dark:text-slate-400 contrast-more:text-ocean-700 dark:contrast-more:text-ocean-100 mr-2 last:mr-0", className)
    }>
        {children}
    </a>;
}

export function Footer({ className }: { className?: string }) {
    return <footer className={
        classNames("sm:flex sm:justify-between text-slate-400 contrast-more:text-black dark:text-slate-500 dark:contrast-more:text-white space-y-2 sm:space-y-0", className)
    }>
        <FooterList>
            <FooterListItem><FooterLink href="https://github.com/anli5005/site">Made with<FontAwesomeIcon className="ml-1" icon={faHeart} /></FooterLink></FooterListItem>
            <FooterListItem>&copy; 2022 Anthony Li</FooterListItem>
        </FooterList>
        <FooterList>
            <FooterListItem><Link href="/[page]" as="/attribution" passHref><FooterLink>Attribution</FooterLink></Link></FooterListItem>
            <FooterListItem>
                <FooterSocial href="https://github.com/anli5005" className="hover:text-[#333] dark:hover:text-[#f5f5f5]"><FontAwesomeIcon icon={faGithub} /><span className="sr-only">GitHub: @anli5005</span></FooterSocial>
                <FooterSocial href="https://linkedin.com/in/anlidev" className="hover:text-[#0077b5]"><FontAwesomeIcon icon={faLinkedin} /><span className="sr-only">LinkedIn</span></FooterSocial>
                <FooterSocial href="https://twitter.com/anli5005" className="hover:text-[#1da1f2]"><FontAwesomeIcon icon={faTwitter} /><span className="sr-only">Twitter: @anli5005</span></FooterSocial>
                <FooterSocial href="mailto:me@anli.dev" className="hover:text-slate-600 active:text-slate-700 dark:hover:text-slate-300 dark:active:text-slate-200"><FontAwesomeIcon icon={faEnvelope} /><span className="sr-only">Email: me@anli.dev</span></FooterSocial>
            </FooterListItem>
        </FooterList>
    </footer>;
}