import { faArrowRight } from '@fortawesome/pro-regular-svg-icons';
import Page from 'components/Page';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MiscPage() {
    return <Page title="Misc" logoAccent="moreAccent">
        <h1>More Stuff</h1>
        <p><Link href="/classnotes"><a>Notes for BCA Students <FontAwesomeIcon icon={faArrowRight} /></a></Link></p>
    </Page>
}