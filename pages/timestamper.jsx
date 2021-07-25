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

export default function Timestamper() {
    const [input, setInput] = useState("now");
    const date = parseDate(input);

    return <Page title="UNIX Timestamper" logoAccent="moreAccent">
        <h1>UNIX Timestamper</h1>
        <p className="lead">A small utility</p>

        <div className="form-group mt-5">
            <label for="timestamper-input">Enter a date:</label>
            <input type="text" class="form-control" id="timestamper-input" value={input} onChange={e => setInput(e.target.value)} />
            <p className="mt-1" style={{opacity: 0.7}}><small>{date?.toString() || "Unable to parse"}</small></p>
        </div>

        <div className="mt-5">
            <div className="mb-2">Timestamp:</div>
            <div>{date ? <TimestampOutput className="lead">{Math.floor(date.getTime() / 1000)}</TimestampOutput> : <span className="lead">???</span>}</div>
        </div>
    </Page>
}