import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { Container } from "react-bootstrap";

export default function Footer() {
    return <footer>
        <Container>
            <a href="https://github.com/anli5005/site">Made with <FontAwesomeIcon icon={faHeart} alt /></a><span className="sr-only">love</span>. &copy; 2020 Anthony Li under <a href="https://github.com/anli5005/anli5005.github.io/blob/master/LICENSE">MIT License</a>.
            <Link href="/[page]" as="/about"><a>About</a></Link>. <Link href="/[page]" as="/attribution"><a>Attribution</a></Link>. <a href="https://anli5005.github.io">Old site</a>.
        </Container>
    </footer>
}