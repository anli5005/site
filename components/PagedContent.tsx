import { ReactNode } from "react";

export interface PagedContentProps<Item> {
    items: Item[];
    pageIndex: number;
    perPage: number;
    totalPages: number;
}

export interface PagingDetails {

}

export function PagedContent<Item>({ items, pageIndex, perPage, totalPages, children }: PagedContentProps<Item> & {
    children: (items: Item[]) => ReactNode,
}) {
    return children(items);
}

export async function getProps<RequestResultItem = any, Item = RequestResultItem>(
    requestPage: () => PromiseLike<RequestResultItem[] & { _paging: PagingDetails }>,
    mapItem: (item: RequestResultItem) => Item,
): Promise<{ props: PagedContentProps<Item> } | { notFound: true, shouldRevalidate: boolean }> {
    return {
        notFound: true,
        shouldRevalidate: false,
    };
}