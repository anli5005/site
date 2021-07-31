import { Button } from 'react-bootstrap';
import { parseDate } from 'chrono-node';
import Page from 'components/Page';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';

const TimestampOutput = styled.code`
    background-color: ${({theme}) => theme.colors.secondaryBackground};
    border-radius: 3px;
    color: inherit;
    padding: 0 ${({theme}) => theme.spacing.xs};
`;

const defaultInput = "now";
const definedDates = new Map([
    ["vampire time", "4:30am"]
]);

function getDate(string) {
    return parseDate(definedDates.get(string) || string);
}

function Timestamper({initialInput}) {
    const [input, setInput] = useState(initialInput);

    const [debouncedInput] = useDebounce(input, 700);
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== "undefined") {
            const query = (debouncedInput === defaultInput) ? "" : `?date=${encodeURIComponent(debouncedInput)}`;
            router.replace(query, query, {shallow: true});
        }
    }, [debouncedInput]);

    // This prevents the timestamp from suddenly changing between renders
    const dateRef = useRef({});
    if (dateRef.current.input !== input) {
        dateRef.current = {input, date: getDate(input)};
    }
    const date = dateRef.current.date;

    return <Page title="UNIX Timestamper" logoAccent="moreAccent">
        <h1>UNIX Timestamper</h1>
        <p className="lead">A small utility</p>

        <form className="form-group mt-5" method="get" onSubmit={e => e.preventDefault()}>
            <label htmlFor="timestamper-input">
                <div>Enter a date:</div>
                <div style={{opacity: 0.7}}><small><i>Examples: now, tomorrow, july 31, 8pm</i></small></div>
            </label>
            <input name="date" type="text" className="form-control" id="timestamper-input" value={input} onChange={e => setInput(e.target.value)} />
            <noscript><Button variant="primary" type="submit">Submit</Button></noscript>
            <p className="mt-1"><small>{date?.toString() || "Unable to parse"}</small></p>
        </form>

        <div className="mt-5">
            <div className="mb-2">Timestamp:</div>
            <div>{date ? <TimestampOutput id="timestamp" className="lead">{Math.floor(date.getTime() / 1000)}</TimestampOutput> : <span className="lead">???</span>}</div>
        </div>
    </Page>
}

Timestamper.getInitialProps = ({query}) => {
    if (typeof query.date === "string") return {initialInput: query.date};
    return {initialInput: defaultInput};
};

export default Timestamper;