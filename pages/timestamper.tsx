import { parseDate } from "chrono-node";
import { useTopLevelBreadcrumbConfiguration } from "components/Breadcrumbs";
import { PageTitle } from "components/PageTitle";
import { NextSeo } from "next-seo";
import { BaseContext } from "next/dist/shared/lib/utils";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const defaultInput = "now";
const definedDates = new Map([
    ["vampire time", "4:30am"],
]);

function getDate(string: string) {
    return parseDate(definedDates.get(string.toLowerCase()) || string);
}

function Timestamper({ initialInput }: { initialInput: string }) {
    useTopLevelBreadcrumbConfiguration();

    const [input, setInput] = useState(initialInput);

    const [debouncedInput] = useDebounce(input, 700);
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== "undefined") {
            const query = (debouncedInput === defaultInput) ? "" : `?date=${encodeURIComponent(debouncedInput)}`;
            router.replace(query, query, { shallow: true });
        }
    }, [debouncedInput]);

    // This prevents the timestamp from suddenly changing between renders
    const dateRef = useRef<{ date?: Date, input?: string }>({});
    if (dateRef.current.input !== input) {
        dateRef.current = { input, date: getDate(input) };
    }
    const date = dateRef.current.date;

    return <>
        <NextSeo title="UNIX Timestamper" openGraph={{
            title: "UNIX Timestamper",
        }} />

        <PageTitle bgClip={true} className="bg-gradient-to-br from-grape-400 to-grape-800 dark:from-grape-300 dark:to-grape-600">
            UNIX Timestamper
        </PageTitle>
        <p className="text-lg">A small utility</p>
        <noscript><p><strong>Enable JavaScript to use your local time zone.</strong></p></noscript>

        <form className="mt-5" method="get" onSubmit={e => e.preventDefault()}>
            <label htmlFor="timestamper-input">
                <h5 className="font-bold">Enter a date:</h5>
                <div className="mb-1 text-sm opacity-70 italic">Examples: now, tomorrow, july 31, 8pm</div>
            </label>
            <input name="date" type="text" className="bg-ocean-100 dark:bg-ocean-900 border border-slate-400 dark:border-slate-700 rounded w-full px-3 py-2" id="timestamper-input" value={input} onChange={e => setInput(e.target.value)} />
            <noscript><div className="mt-1"><button type="submit">Submit</button></div></noscript>
            <p className="mt-1"><small>{date?.toString() || "Unable to parse"}</small></p>
        </form>

        <div className="mt-5">
            <div className="mb-1">Timestamp:</div>
            <div>{date ? <code className="text-lg px-1 rounded bg-ocean-100 dark:bg-ocean-900" id="timestamp">{Math.floor(date.getTime() / 1000)}</code> : <span className="text-lg">???</span>}</div>
        </div>
    </>
}

Timestamper.getInitialProps = ({ query }: BaseContext) => {
    if (typeof query.date === "string") return { initialInput: query.date };
    return { initialInput: defaultInput };
};

export default Timestamper;