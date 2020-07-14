import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons';
import Logo from 'components/Logo';

export default function Home() {
    return <Fragment>
        <Logo size={300} circle />
        <h1>Hello, world! <FontAwesomeIcon icon={faArrowRight} /></h1>
    </Fragment>;
}
