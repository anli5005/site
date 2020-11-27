import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export default function ProjectButton({project: {url, domain, brand: {bg, fg}}}) {
    return <Button color="primary" as="a" href={url}>{domain || url} <FontAwesomeIcon icon={faArrowRight} /></Button>
}