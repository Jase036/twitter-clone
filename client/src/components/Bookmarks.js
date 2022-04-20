import React from "react";
import styled from "styled-components";

const Bookmarks = () => {
    return (
        <Wrapper>
            <Title>Bookmarks</Title>
            
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin: 0px;
    display:flex;
    flex-direction: column;
    border: 1px solid #ddd;
    width:550px;
`
const Title = styled.div`
    font-weight: 800;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    position: sticky;
    top: 0px;
    backface-visibility: hidden;
    z-index: 3;
    background-color: #fff;
`
export default Bookmarks;