import React, {useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import RenderSingleTweet from "./RenderSingleTweet";
import { TweetContext } from "./TweetContext";
import styled from 'styled-components';
import { CircularProgress } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { ErrorContext } from "./ErrorContext";

const TweetDetails = () => {
    const {state: {status}, receiveTweetFromServer, loadingStatus,} = useContext(TweetContext)
    const {setError} = useContext(ErrorContext);
    const { tweetId } = useParams();
    const fetchUrl = `/api/tweet/${tweetId}`

    useEffect(() => {
        loadingStatus();
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                receiveTweetFromServer(data.tweet)})
            .catch(err => {
                setError(true);
                console.log(err)});
    }, []); 


    return (
        <Wrapper>
            <Title onClick={() => window.history.back()}><FiArrowLeft /> Tweet</Title>
        {status === 'loading' ? <Loading /> : 
        <RenderSingleTweet />}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 0px;
    display:flex;
    flex-direction:column;
    border: 1px solid #ddd;
    width: 552px;
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
    width: 550px;
    cursor: pointer;
`
const Loading = styled(CircularProgress)`
    margin: 200px auto;
`

export default TweetDetails;



