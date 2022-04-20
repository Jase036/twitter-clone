import React, {createContext, useReducer} from 'react';


export const TweetContext = createContext(null);

const initialState = {
    tweet: {},
    tweetFeed: {},
    postStatus: null,
    status: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'tweet-info-from-server': {
            // console.log(action)
            return {
                ...state,
                ...action,
                status: 'idle'
            };
        }
        case 'tweetfeed-info-from-server': {
            // console.log(action)
            return {
                ...state,
                ...action,
                status: 'idle'
            };
        }
        case 'loading-status': {
            // console.log(action)
            return {
                ...state,
                status: 'loading'
            };
        }
        
        default:
            throw new Error(`Unrecognized action: ${action.type}`);
    }
}


export const TweetProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const receiveTweetFromServer = (data) => {
    dispatch({
        type: "tweet-info-from-server",
        tweet: {...data}
    });
    };

    const receiveTweetFeedFromServer = (data) => {
        dispatch({
            type: "tweetfeed-info-from-server",
            tweetFeed: {...data}
        });
        };

    const loadingStatus = () => {
        dispatch({
            type: "loading-status",
        });
        };

    const updateFeed = () => {
        dispatch({
            type: "update-feed"
        })
    }
    
    return (
        <TweetContext.Provider
        value={{
            state,
            updateFeed,
            receiveTweetFromServer,
            receiveTweetFeedFromServer,
            loadingStatus,
        }}
        >
        {children}
        </TweetContext.Provider>
    );
}