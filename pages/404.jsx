import Page from 'components/Page';
import Link from 'next/link';
import { Breadcrumb } from 'react-bootstrap';

export default function OhNoPageIsNotFoundWhatAreWeGoingToDo() {
    return <Page title="404 Not Found">
        <Breadcrumb>
            <Breadcrumb.Item active>???</Breadcrumb.Item>
        </Breadcrumb>
        <h1>404</h1>
        <p><strong>Page not found :(</strong></p>
        <p>The requested page could not be found.</p>
        <p>Go back to the <Link href="/"><a>homepage</a></Link>?</p>
    </Page>;
}

export function NotFound() {
    return <OhNoPageIsNotFoundWhatAreWeGoingToDo />;
}