import { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from 'components/Logo';
import styled from 'styled-components';

const HalfOpacity = styled.span`
    opacity: 0.5;
`;

const BigRoundedBox = styled.div`
    border-radius: 32px;
    background-color: ${props => props.theme.colors.secondaryBackground};
    color: ${props => props.theme.colors.primary};

    @media (prefers-color-scheme: dark) {
        color: ${props => props.theme.colors.dark.text};
    }
`;

const SomewhatDeemphasizedText = styled.p`
    color: ${props => props.theme.colors.link};
`;

export default function Home() {
    return <Fragment>
        <Container className="px-3 my-3 my-sm-5">
            <BigRoundedBox className="py-5 px-5 px-lg-3 d-flex flex-column flex-md-row align-items-center justify-content-center">
                <Logo className="flex-grow-0 flex-shrink-0" size={150} circle />
                <div className="ml-md-5 mt-3 mt-md-0 text-center text-md-left">
                    <h1 className="mb-0">Anthony Li</h1>
                    <SomewhatDeemphasizedText className="h4 mb-4">anli<HalfOpacity>5005</HalfOpacity></SomewhatDeemphasizedText>
                    <p>I make random stuff. Some of said stuff might be helpful or entertaining. BCA ATCS '22</p>
                </div>
            </BigRoundedBox>
        </Container>
    </Fragment>;
}
