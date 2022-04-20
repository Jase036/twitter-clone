import React, {useContext} from "react";
import styled from "styled-components";
import TweetActions from "./TweetActions";
import { TweetContext } from "./TweetContext";
import moment from 'moment';
import { useHistory } from "react-router";


const RenderSingleTweet = () => {
    const {state: {tweet}} = useContext(TweetContext)
    let history = useHistory();
    
    function handleClickAuthor(ev, handle) {
        ev.stopPropagation()
        const profileUrl = '/profile/' + handle
        history.push(profileUrl);
    }
    
    return (
        <>
            {Object.values(tweet).length !==0 && 
            <Wrapper>
            
            <Content>
                <FeedTweetHead>
                    <FeedAvatar alt="user avatar" src={tweet.author.avatarSrc} onClick={(ev) => handleClickAuthor(ev, tweet.author.handle)}/>
                    <User>
                        <RealName onClick={(ev) => handleClickAuthor(ev, tweet.author.handle)}>{tweet.author.displayName}</RealName>
                        <p>@{tweet.author.handle}</p>
                    </User>
                </FeedTweetHead>
            
                <TweetStatus>{tweet.status}</TweetStatus>
                {tweet.media[0] && <TweetMedia src={tweet.media[0].url}></TweetMedia> } 
                <Timestamp>{moment(tweet.timestamp).format('h:mmA · MMMM Do, YYYY' )}</Timestamp>
                <TweetActions feedTweet={tweet}/>
            </Content>
            </Wrapper>}
        </>
    )

}

const Wrapper = styled.div`
    margin: 0px;
    display:flex;
    border: none;
    border-bottom: 1px solid #ddd;
    width: 550px;
    background-color: #fff;
    outline: none;
    padding: 15px 10px;

`
const FeedAvatar = styled.img `
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 15px;
`
const User = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 15px;
`

const FeedTweetHead = styled.div`
    color: #888;
    display:flex;
    align-content:flex-start;
`
const RealName = styled.span`
    font-weight: bold;
    color: #000;
    margin-bottom: 3px;
`
const TweetStatus = styled.p`
    margin: 15px 0;
    word-break: break-all;
`
const TweetMedia = styled.img`
    border-radius: 10px;
    width: 500px;
    margin-bottom: 10px;
`

const Timestamp = styled.p`
    color: #888;
`

export default RenderSingleTweet;