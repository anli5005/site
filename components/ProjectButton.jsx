import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darken } from "polished";
import styled from "styled-components";

const CustomButton = styled.a.attrs({className: "btn btn-primary"})`
    ${props => props.bg && `background-color: ${props.bg}; border-color: ${props.bg};`}
    ${props => props.fg && `color: ${props.fg};`}

    &:hover {
        ${props => props.bg && `background-color: ${darken(0.05, props.bg)}; border-color: ${darken(0.05, props.bg)};`}
    }

    &:not(:disabled):not(.disabled):active {
        ${props => props.bg && `background-color: ${darken(0.1, props.bg)}; border-color: ${darken(0.1, props.bg)};`}
    }
`;

export default function ProjectButton({project: {url, domain, brand: {bg, fg}}}) {
    return <CustomButton color="primary" as="a" href={url} bg={bg} fg={fg}>{domain || url} <FontAwesomeIcon icon={faArrowRight} /></CustomButton>
}