import Page from 'components/Page';
import OhNoPageIsNotFoundWhatAreWeGoingToDo from './404';

export default function ErrorPage({statusCode}) {
    if (statusCode === 404) {
        return <OhNoPageIsNotFoundWhatAreWeGoingToDo />;
    } else {
        return <Page title={`Error ${statusCode}`}>
            <h1>{statusCode}</h1>
            <p><strong>An error occurred :(</strong></p>
        </Page>;
    }
}

export function ErrorComponent({statusCode}) {
    return <ErrorPage statusCode={statusCode} />;
}