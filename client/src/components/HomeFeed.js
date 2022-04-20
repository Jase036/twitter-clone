import NewTweet from "./NewTweet";
import RenderFeedTweet from "./RenderFeedTweet";
import styled from 'styled-components'

const HomeFeed = () => {
    return (
        <Wrapper>
            <Title>Home</Title>
        <NewTweet />
        <Divider></Divider>
        {RenderFeedTweet({feedType: 'home', handle: 'me'})}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 0px;
    display:flex;
    flex-direction: column;
    border: 1px solid #ddd;
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
const Divider = styled.div`
    margin: 0px;
    height: 20px;
    background-color: #eee;
`
export default HomeFeed;