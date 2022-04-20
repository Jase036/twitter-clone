import React,{ useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import RenderFeedTweet from "./RenderFeedTweet";
import { CircularProgress} from "@mui/material";
import { COLORS } from "../constants";
import { ErrorContext } from "./ErrorContext";
import moment from 'moment'
import { FiCalendar, FiMapPin } from "react-icons/fi";


const RenderProfile = () => {
    const [profile, setProfile] = useState('');
    const [status, setStatus] = useState ('');
    const {setError} = useContext(ErrorContext);
    const handle = useParams()
    let fetchProfileUrl = `/api/${handle.profileId}/profile`

    useEffect(() => {
        setStatus('loading')
        fetch(fetchProfileUrl)
            .then(res => res.json())
            .then(data => {
                setProfile(data.profile);
                setStatus('loaded')})
            .catch(err => {
                setError(true);
                console.log(err)});
        }, [handle]); 

    return (
        <>
            {status === 'loading' ? <Loading /> :
            <Wrapper>
                <Header>
                    <img src={profile.bannerSrc} alt="User banner"/>
                    <ProfileAvatar src={profile.avatarSrc} />
                    <FollowingButton>{profile.isBeingFollowedByYou ? `Following`: `Follow`}</FollowingButton>
                </Header>
                <RealName>{profile.displayName}</RealName>
                <Handle>@{profile.handle} <FollowsYou>{profile.isFollowingYou ? `Follows you`: `Doesn't follow you`}</FollowsYou></Handle>
                <Bio>{profile.bio}</Bio>
                <Location><Pin />{profile.location} <Calendar />Joined {moment(profile.joined).format( 'MMMM, YYYY' )}</Location>
                <InfoBox>
                <FollowInfo>{profile.numFollowing} Following</FollowInfo>
                <FollowInfo>{profile.numFollowers} Followers</FollowInfo>
                </InfoBox>
                <TabBox id="Tweet">
                    <Hash to='#Tweet'>Tweets</Hash>
                    <TabElem to='#'>Media</TabElem>
                    <TabElem to='#'>Likes</TabElem>
                </TabBox>
                <RenderFeedTweet feedType='profile' handle={handle} />
            </Wrapper>
            }
        </>
    )
}



const Wrapper = styled.div`
    margin: 0px;
    display:flex;
    flex-direction:column;
    border: none;
    border-bottom: 1px solid #ddd;
    width: 550px;
    background-color: #fff;
`

const ProfileAvatar = styled.img `
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid white;
    margin: -50px 0 25px 25px;
`

const Loading = styled(CircularProgress)`
    margin: 200px auto;
`
const Header = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 25px;
`
const Handle = styled.p`
    color: #888;
    padding: 0 15px;
`
const RealName = styled.p`
    font-weight: bold;
    color: #000;
    padding: 0 15px;
`
const Bio = styled.p`
    font-weight: bold;
    color: #000;
    z-index: 2;
    padding: 15px 15px 0 15px;
`
const FollowInfo = styled.p`
    font-weight: bold;
    color: #000;
    z-index: 2;
    padding: 15px;
`
const Location = styled.p`
    margin: 15px 0;
    padding: 15px;
`
const FollowingButton = styled.button`
    color: #fff;
    background-color:  ${COLORS.primary};
    padding: 10px 20px 10px 10px;
    border-radius: 25px;
    text-decoration: none;
    line-height: 1em;
    font-size: 20px;
    margin: -60px 15px 0 0;
    width: 150px;
    border: none;
    align-self: flex-end;
    cursor: pointer;
`
const FollowsYou = styled.span`
    background-color: #ddd;
    font-style: italic;
    font-size: 14px;
    margin-left: 10px;
`
const Pin = styled(FiMapPin)`
    margin-right: 10px;
`
const Calendar = styled(FiCalendar)`
    margin: 0px 10px 0 20px;
`
const InfoBox = styled.div`
    display:flex;
`
const TabBox = styled.div`
    display:flex;
`
const Hash = styled(NavLink)`
    box-sizing: border-box;
    text-decoration: none;
    flex-grow: 1;
    text-align:center;
    margin-bottom: 10px;

    &:hover {
        color: ${COLORS.primary};
        border-bottom: 2px solid ${COLORS.primary};
    }
    &.active {
        color: ${COLORS.primary};
        border-bottom: 2px solid ${COLORS.primary};
    }
`
const TabElem = styled.div`
    box-sizing: border-box;
    text-decoration: none;
    flex-grow: 1;
    text-align:center;
    margin-bottom: 10px;

    &:hover {
        color: ${COLORS.primary};
        border-bottom: 2px solid ${COLORS.primary};
        cursor: pointer;
    }
`
export default RenderProfile;