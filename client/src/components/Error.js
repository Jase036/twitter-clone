import React from 'react';
import styled from 'styled-components'
import { COLORS } from '../constants';

const Error = () => {


return (
    <Wrapper>
        <img src='/assets/error.png' alt='error'/>
        <ErrMsg>Oooops! Looks like backend server kitty is taking a nap. Try <Anchor onClick={() => window.location.reload()}> refreshing</Anchor> the page.</ErrMsg>
    </Wrapper>
)

}

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    max-width: 650px;
`
const ErrMsg = styled.p`
    max-width: 450px;
    font-size: 25px;
    align-self: center;
`
const Anchor = styled.a`
cursor: pointer;
color: ${COLORS.primary};
`
export default Error;