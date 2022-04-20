import React, {useContext, useEffect, useState} from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import styled from 'styled-components';
import { COLORS } from "../constants";
import { CircularProgress } from '@mui/material';
import { ErrorContext } from './ErrorContext';



const NewTweet = ({modalState, setModalState}) => {
    const {state: {currentUser: {profile}}, state: {status}, updateFeed} = useContext(CurrentUserContext)
    const [newTweet, setNewTweet] = useState ('');
    const [charLeft, setCharLeft] = useState (280);
    const {setError} = useContext(ErrorContext)

    const handleNewTweet = (ev) => {
        setNewTweet(ev.target.value);
        }
    
    const postTweet = () => {
        fetch('/api/tweet', {
            method: 'POST',
            body: JSON.stringify({status: newTweet}),
            headers: {'Content-Type': 'application/json'}
            }
        )
            .then(res => res.json())
            .then((data) => {
                setNewTweet('');
                updateFeed();
                })
            .catch(err => {
                setError(true);
                console.log(err)
            })
        if (modalState) {
            setModalState(false);
        }
    }

    useEffect(() => {
        setCharLeft(280 - newTweet.length); 
    }, [newTweet]);
    
    let active = charLeft < 280 && charLeft >= 0 ? false : true;

    if(status !== 'idle') { return (<Loading />) }
    else {
    return (
        <>
            <Wrapper>
            <FeedAvatar alt="user avatar" src={profile?.avatarSrc} />
            <TweetText placeholder="What's happening?" onChange={(ev) => {handleNewTweet(ev)}} value={newTweet}></TweetText>
            </Wrapper>
            <TweetButtonArea><Counter chars={charLeft}>{charLeft}</Counter><TweetButton disabled={active} onClick={postTweet}>Meow</TweetButton></TweetButtonArea>
        </>
    )
    }
}

const handleColorType = chars => {
    if (chars < 0) {
        return 'red';
    } else if (chars < 55) {
        return '#eaca33';
    } else {
        return '#aaa'
    }
}


const Wrapper = styled.div`
    margin: 0px;
    display:flex;
    border: none;
    padding: 15px 15px;
`


const FeedAvatar = styled.img `
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const TweetButtonArea = styled.div`
    margin: 0px;
    display:flex;
    justify-content: flex-end;
    border: none;
    padding: 15px 10px;
`
const Counter = styled.div`
    margin-right: 25px;
    display:flex;
    align-self: center;
    color: ${({chars}) => handleColorType(chars)};

`

const TweetButton = styled.button`
    color: #fff;
    background-color:  ${COLORS.primary};
    padding: 10px;
    border-radius: 25px;
    text-decoration: none;
    line-height: 1em;
    font-size: 20px;
    border: none;
    align-self: flex-end;
    cursor: pointer;

&:disabled {
    background-color: ${COLORS.secondary};
    cursor: not-allowed;
}
`
const Loading = styled(CircularProgress)`
    margin: 200px 200px;
    
`
const TweetText = styled.textarea`
    width: 460px;
    height: 150px;
    border:none;
    padding: 10px;
    font-size: 14px;
    resize: none;
    outline: none;
`
export default NewTweet;