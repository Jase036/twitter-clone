import React, {useContext, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components';
import Sidebar from "./components/Sidebar";
import HomeFeed from "./components/HomeFeed";
import Notifications from "./components/Notifications";
import Bookmarks from "./components/Bookmarks";
import TweetDetails from "./components/TweetDetails";
import Profile from "./components/Profile";
import { CurrentUserContext } from "./components/CurrentUserContext";
import { ErrorContext } from "./components/ErrorContext";
import Error from "./components/Error";

const App = () => {
const {receiveCurrentUserFromServer, loadingStatus} = useContext(CurrentUserContext);
const {error, setError} = useContext(ErrorContext);

  useEffect(() => {
    loadingStatus();
    fetch("/api/me/profile")
      .then(res => res.json())
      .then(data => receiveCurrentUserFromServer(data))
      .catch(err => {
        setError(true);
        console.log(err)});
  }, []);


  return (
    <>
      <GlobalStyles /> 
      <Router>
        <Wrapper>
        <Sidebar />
        { error ? <Error /> : 
        <Switch>
          <Route exact path="/">
            <HomeFeed />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route path="/tweet/:tweetId">
            <TweetDetails />
          </Route>
          <Route path="/profile/:profileId">
            <Profile />
          </Route>
        </Switch>}
        </Wrapper>
      </Router>
    </>);
};

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: sans-serif;
    }

`;

const Wrapper = styled.div`
    display:flex;
    justify-content: center;
`

export default App;
