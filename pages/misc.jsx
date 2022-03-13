import { faArrowRight } from '@fortawesome/pro-regular-svg-icons';
import Page from 'components/Page';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TitleHeader } from 'components/TitleHeader';

export default function MiscPage() {
    return <Page title="Misc" logoAccent="moreAccent">
        <TitleHeader>More Stuff</TitleHeader>
        <p><Link href="/classnotes"><a>Notes for BCA Students <FontAwesomeIcon icon={faArrowRight} /></a></Link></p>
        <p><Link href="/timestamper"><a>UNIX Timestamper <FontAwesomeIcon icon={faArrowRight} /></a></Link></p>
    </Page>
}