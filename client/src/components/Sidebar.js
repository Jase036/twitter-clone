import React, { useState } from "react";
import Logo from "./Logo";
import styled from "styled-components";
import { COLORS } from "../constants";
import {NavLink} from 'react-router-dom'
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import {Dialog, DialogContent, DialogTitle, Button} from '@mui/material/';
import NewTweet from "./NewTweet";


const Sidebar = () => {
    const [open, setOpen] = useState(false)
    
    //Open the tweet modal by changing the open state
    const handleTweetModal = () => {
        setOpen(true);
    }

    //Close the modal when the user hits close button, clicks outside the modal or the tweet is sent.
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div><Wrapper>
            
            <LogoWrapper>
                <Logo />
            </LogoWrapper>
            <LinkWrapper>
                <NavigationLink exact to={`/`}><HomeIcon /> Home</NavigationLink>
                <NavigationLink to={`/profile/treasurymog`}><ProfileIcon />  Profile</NavigationLink>
                <NavigationLink to={`/notifications`}><NotificationIcon />  Notifications</NavigationLink>
                <NavigationLink to={`/bookmarks`}><BookmarksIcon />  Bookmarks</NavigationLink>
                <TweetLink onClick={handleTweetModal}>Meow</TweetLink>
            </LinkWrapper>
            
            {/* This is our modal that calls the NewTweet component to post a new tweet. */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Meow</DialogTitle>
                <DialogContent>
                    <NewTweet modalState={open} setModalState={setOpen}/>
                </DialogContent>
                <Button onClick={handleClose}>Close</Button>
            </Dialog>
            
        </Wrapper></div>
    )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    padding: 10px;
    margin: 10px 20px 0 40px;
    min-width: 205px;
    position: sticky;
    top: 0px;
`
const NavigationLink = styled(NavLink)`
    width: auto;
    padding: 10px 20px 10px 10px;
    border-radius: 25px;
    text-decoration: none;
    line-height: 1em;
    font-size: 20px;
    margin-top: 15px; 
    

    &.active {
        color: ${COLORS.primary};
        background-color: ${COLORS.secondary}
    }

`;

const LogoWrapper = styled.div`
    margin-bottom: 40px;
`
const LinkWrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: flex-start;
`

const HomeIcon = styled(FiHome)`
    margin: 0 10px;
`
const ProfileIcon = styled(FiUser)`
    margin: 0 10px;
`
const NotificationIcon = styled(FiBell)`
    margin: 0 10px;
`
const BookmarksIcon = styled(FiBookmark)`
    margin: 0 10px;
`
const TweetLink = styled.button`
    background-color: ${COLORS.primary};
    width: 100%;
    padding: 10px 20px 10px 10px;
    border-radius: 25px;
    border:none;
    text-decoration: none;
    line-height: 1em;
    font-size: 20px;
    margin-top: 50px;
    color: #fff;
    cursor: pointer;
`

export default Sidebar;