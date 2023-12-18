"use client";

import { useAppContext } from "components/AppContext";
import { Fragment, useEffect } from "react";

export default function Loading() {
    const { setLoading } = useAppContext();
    
    useEffect(() => {
        setLoading(true);
        return () => setLoading(false);
    }, []);

    return <Fragment />;
}