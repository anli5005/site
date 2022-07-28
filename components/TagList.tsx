import classNames from "classnames";

export interface Tag {
    id: number;
    name: string;
}

export function TagList({ tags, className, tagAppearance = "border border-slate-400 dark:border-slate-600" }: {
    tags: Tag[],
    className?: string,
    tagAppearance?: string,
}) {
    return <div className={classNames("text-sm font-sans font-bold flex flex-wrap", className)}>
        {tags.map(tag => <span className={classNames("block rounded-full px-2", tagAppearance)} key={tag.id}>{tag.name}</span>)}
    </div>;
}