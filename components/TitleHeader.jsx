import { forwardRef } from "react";

export const TitleHeader = forwardRef(({ref, children}) => {
    return (
        <h1 ref={ref} className="font-sans font-bold text-5xl md:text-7xl">
            {children}
        </h1>
    );
});