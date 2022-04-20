import React, { useState } from "react";
import styled from "styled-components";
// import { FiRepeat, FiShare2, FiHeart, FiMessageCircle } from "react-icons/fi";
import Action from "./Action";
import TweetActionIcon from './TweetActionIcon';
import LikeButton from "./LikeButton";

const TweetActions = ({feedTweet}) => {
    const [liked, setLiked] = useState (feedTweet.isLiked);
    const [retweet, setRetweet] = useState (feedTweet.isRetweeted);
    const [numLikes, setNumLikes] = useState (feedTweet.numLikes);
    const [numRetweets, setNumRetweets] = useState (feedTweet.numRetweets)
    const likeUrl = `/api/tweet/${feedTweet.id}/like`
    const retweetUrl = `/api/tweet/${feedTweet.id}/retweet`
    const likeToggle = !liked
    const retweetToggle = !retweet

  //A lot of this code refactored from Animation workshop :)

    const handleToggleLike = (ev) => {
        ev.stopPropagation();
        fetch(likeUrl, {
            method: 'PUT',
            body: JSON.stringify({like: likeToggle}),
            headers: {'Content-Type': 'application/json'}
            }
        )
    
        setLiked(!liked);
        !liked ? setNumLikes(numLikes + 1) : setNumLikes(numLikes - 1)
    }    
    
    const handleToggleRetweet = (ev) => {
        ev.stopPropagation();
        fetch(retweetUrl, {
            method: 'PUT',
            body: JSON.stringify({retweet: retweetToggle}),
            headers: {'Content-Type': 'application/json'}
            }
        )
    
        setRetweet(!retweet);
        !retweet ? setNumRetweets(numRetweets + 1) : setNumRetweets(numRetweets - 1)
    }    

    return (

        <Wrapper>
      <Action color="rgb(27, 149, 224)" size={40}>
        <TweetActionIcon kind="reply" />
      </Action> 
      <Action color="rgb(23, 191, 99)" size={40} onClick={(ev) => handleToggleRetweet(ev)}>
        <TweetActionIcon
          kind="retweet"
          retweet={retweet}
          color={retweet ? "rgb(23, 191, 99)" : 'black'}
        />
      </Action>
      <Action color="rgb(224, 36, 94)" size={40} onClick={(ev) => handleToggleLike(ev)}>
        <LikeButton liked={liked} />
      </Action>
      
      <Action color="rgb(27, 149, 224)" size={40}>
        <TweetActionIcon kind="share" />
      </Action>
      {liked && <Likes>{numLikes}</Likes>}
      {retweet && <Retweets>{numRetweets}</Retweets>}
    </Wrapper>
    )
}


const Wrapper = styled.div`
    display:flex;
    padding: 10px;
    justify-content: space-evenly;
    margin-top: 15px;
    position:relative;
    width: 450px;
`
const Likes = styled.p`
    margin-top: 11px;
    position: absolute;
    left: 290px;
`
const Retweets = styled.p`
    margin-top: 11px;
    position: absolute;
    left: 200px;

`
export default TweetActions;