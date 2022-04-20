import React from "react";
import styled from 'styled-components'
import RenderProfile from "./RenderProfile";

const Profile = () => {
    return (
    <Wrapper>
        <Title>Profile</Title>
        <RenderProfile />
    </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 0px;
    display:flex;
    flex-direction: column;
    border: 1px solid #ddd;
    width:552px;
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
export default Profile;