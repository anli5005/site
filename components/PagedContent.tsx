import { faEllipsisH } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import { forwardRef, HTMLProps, PropsWithChildren, ReactNode } from "react";

export interface PagedContentProps<Item> {
    items: Item[];
    pageIndex: number;
    totalPages: number;
}

export type PagePathProvider = (page: number) => { href: string, as?: string };

export interface PagingDetails {
    totalPages: number;
}

const PaginationButton = forwardRef<HTMLAnchorElement, HTMLProps<HTMLAnchorElement> & { active?: boolean }>(({ active = false, children, ...props }, ref) => {
    return <a {...props} ref={ref} className={classNames(
        active && "font-bold text-2xl sm:text-3xl border border-slate-300 dark:border-slate-600 px-2 rounded",
        !active && "sm:text-xl text-ocean-500 hover:text-ocean-700 dark:text-ocean-300 dark:hover:text-ocean-400",
        "text-lg",
    )} aria-current={active}>
        {children}
    </a>;
});

function PaginationEllipsis() {
    return <span className="text-xl dark:text-ocean-300/50"><FontAwesomeIcon icon={faEllipsisH} /></span>
}

export function Pagination({ className, pageIndex, totalPages, getPagePath }: { className?: string, pageIndex: number, totalPages: number, getPagePath: PagePathProvider }) {
    if (totalPages === 1) {
        // What's the point of having pagination if there's only one page?
        return <></>;
    }

    const minPage = Math.max(1, pageIndex - 2);
    const maxPage = Math.min(pageIndex + 2, totalPages);
    const pages = [];
    for (let i = minPage; i <= maxPage; i++) {
        pages.push(i);
    }
    
    return <nav aria-label="Pagination" className={classNames(
        "w-full p-2 bg-ocean-50 dark:bg-ocean-950 rounded-lg font-sans flex justify-center items-center space-x-3 sm:space-x-4",
        className
    )}>
        {(1 < minPage) && <Link {...getPagePath(1)} passHref><PaginationButton>{(1).toLocaleString()}</PaginationButton></Link>}
        {(1 < minPage - 1) && <PaginationEllipsis />}
        {pages.map(page => {
            return <Link {...getPagePath(page)} key={page} passHref>
                <PaginationButton active={page === pageIndex}>{page.toLocaleString()}</PaginationButton>
            </Link>;
        })}
        {(maxPage + 1 < totalPages) && <PaginationEllipsis />}
        {(maxPage < totalPages) && <Link {...getPagePath(totalPages)} passHref><PaginationButton>{(totalPages).toLocaleString()}</PaginationButton></Link>}
    </nav>;
}

export function PagedContent<Item>({ items, pageIndex, totalPages, getPagePath, children }: PagedContentProps<Item> & {
    getPagePath: PagePathProvider,
    children: (items: Item[]) => ReactNode,
}) {
    return <div>
        {pageIndex > 1 && <Pagination className="mb-4" pageIndex={pageIndex} totalPages={totalPages} getPagePath={getPagePath} />}
        {children(items)}
        {<Pagination className="mt-4" pageIndex={pageIndex} totalPages={totalPages} getPagePath={getPagePath} />}
    </div>;
}

export async function getProps<RequestResultItem = any, Item = RequestResultItem>(
    pageIndex: number,
    requestPage: (pageIndex: number) => PromiseLike<RequestResultItem[] & { _paging: PagingDetails }>,
    mapItem: (item: RequestResultItem) => Item,
): Promise<{ props: PagedContentProps<Item> } | { notFound: true, shouldRevalidate: boolean }> {
    if (Number.isNaN(pageIndex) || pageIndex < 1) {
        return { notFound: true, shouldRevalidate: false };
    }

    const items = await requestPage(pageIndex);
    if (items.length === 0) {
        return {
            notFound: true,
            shouldRevalidate: true,
        };
    }

    return {
        props: {
            items: items.map(mapItem),
            pageIndex,
            totalPages: items._paging.totalPages,
        },
    };
}