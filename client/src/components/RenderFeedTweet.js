import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import TweetActions from "./TweetActions";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { FiRepeat } from "react-icons/fi";
import { TweetContext } from "./TweetContext";
import { CurrentUserContext } from "./CurrentUserContext";
import moment from 'moment';
import { ErrorContext } from "./ErrorContext";

    
const RenderFeedTweet = ({feedType, handle}) => {
    const {state: {tweetFeed}, receiveTweetFeedFromServer} = useContext(TweetContext);
    const {state: {postStatus}} = useContext(CurrentUserContext);
    const {setError} = useContext(ErrorContext)
    const [feedStatus, setFeedStatus] = useState ('');
    let fetchUrl = '';
    let history = useHistory();
    const {tweetIds, tweetsById} = tweetFeed;

    feedType === 'home' ? fetchUrl = '/api/me/home-feed' : fetchUrl= `/api/${handle.profileId}/feed`;

    useEffect(() => {
        setFeedStatus('loading')
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                receiveTweetFeedFromServer(data);
                setFeedStatus('loaded')})
            .catch(err => {
                setError(true);
                console.log(err)})

        return () => {
            setFeedStatus({...feedStatus}); //This seems to remove the memory leak error I was getting when changing components before they had finished loading
        };
        }, [postStatus]); 
            
    
    return (
    <>
        <div>
        {feedStatus === 'loading' ? <Loading /> : 
        
        <Container>    
            {tweetIds?.map( id => {
                const tweet = tweetsById[id]
                const tweetMedia = tweetsById[id].media[0]
            
                function handleClickAuthor(ev, handle) {
                    ev.stopPropagation()
                    const profileUrl = `/profile/${handle}`
                    history.push(profileUrl);
                }
            
                function handleClickTweet() {
                    const tweetUrl = `/tweet/${id}`
                    history.push(tweetUrl);
                }

                return (
                    <div key={id}>
                    {tweet.retweetFrom && <Retweeted><FiRepeat />{tweet.retweetFrom.displayName} Remeowed </Retweeted>}
                    <Wrapper  onClick={() => handleClickTweet()} tabIndex='0' aria-label='View Tweet'>
                        <FeedAvatar alt="user avatar" src={tweet.author.avatarSrc} onClick={(ev) => handleClickAuthor(ev, tweet.author.handle)}/>
                        <Content>
                            <FeedTweetHead><RealName onClick={(ev) => handleClickAuthor(ev, tweet.author.handle)}>{tweet.author.displayName}</RealName> <Handle onClick={(ev) => handleClickAuthor(ev, tweet.author.handle)}>@{tweet.author.handle}</Handle> · {moment(tweet.timestamp).format(('MMM Do'))}</FeedTweetHead>
                            <TweetStatus>{tweet.status}</TweetStatus>
                            {tweetMedia && <TweetMedia src={tweetMedia.url}></TweetMedia> } 
                            <TweetActions feedTweet={tweet}/>
                        </Content>
                    </Wrapper>
                    </div>
                )
            })}
        </Container>}
        </div>
    </>
    )
}


const Container = styled.div`
    display:flex;
    flex-direction: column;
    max-width: 650px;
`
const Loading = styled(CircularProgress)`
    margin: 200px 200px;
    
`

const Wrapper = styled.div`
    margin: 0px;
    display:flex;
    border: none;
    border-bottom: 1px solid #ddd;
    width: 550px;
    background-color: #fff;
    padding: 20px 15px;
    transition-property: background-color;
    transition-duration: 0.3s;
    cursor: pointer;
    word-break: break-all;

&:hover {
    background-color: #f1f1f1;
    box-shadow: 0 0 6px #999;
}
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
const FeedTweetHead = styled.div`
    color: #888;
    display: flex;
`
const Handle = styled.p`
    color: #888;
    margin-left: 8px;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`
const RealName = styled.span`
    font-weight: bold;
    color: #000;
    z-index: 2;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`
const TweetStatus = styled.p`
    margin: 15px 0;
`
const TweetMedia = styled.img`
    border-radius: 10px;
    width: 450px;
`
const Retweeted = styled.div`
    padding: 10px 0 5px 15px;
`

export default RenderFeedTweet;