import { parseDate } from 'chrono-node';
import Page from 'components/Page';
import { useState } from 'react';
import styled from 'styled-components';

const TimestampOutput = styled.code`
    background-color: ${({theme}) => theme.colors.secondaryBackground};
    border-radius: 3px;
    color: inherit;
    padding: 0 ${({theme}) => theme.spacing.xs};
`;

export default function Timestamper({initialInput}) {
    const [input, setInput] = useState(initialInput || "now");
    const date = parseDate(input);

    return <Page title="UNIX Timestamper" logoAccent="moreAccent">
        <h1>UNIX Timestamper</h1>
        <p className="lead">A small utility</p>

        <div className="form-group mt-5">
            <label for="timestamper-input">
                <div>Enter a date:</div>
                <div style={{opacity: 0.7}}><small><i>Examples: now, tomorrow, july 31, 8pm</i></small></div>
            </label>
            <input type="text" className="form-control" id="timestamper-input" value={input} onChange={e => setInput(e.target.value)} />
            <p className="mt-1"><small>{date?.toString() || "Unable to parse"}</small></p>
        </div>

        <div className="mt-5">
            <div className="mb-2">Timestamp:</div>
            <div>{date ? <TimestampOutput className="lead">{Math.floor(date.getTime() / 1000)}</TimestampOutput> : <span className="lead">???</span>}</div>
        </div>
    </Page>
}

export function getInitialProps() {
    return {}; // Force the page to render SSO every time.
}