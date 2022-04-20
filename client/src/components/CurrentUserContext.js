import React, {createContext, useReducer} from 'react';


export const CurrentUserContext = createContext(null);

const initialState = {
    currentUser: {handle: null,
        displayName: null,
        avatarSrc: null,
        bannerSrc: null,
        location: null,
        joined: null,
        bio: null,
        numFollowing: null,
        numFollowers: null,
        numLikes: null,
        isFollowingYou: false,
        isBeingFollowedByYou: false
        },
    status: null,
    postStatus: null
};

function reducer(state, action) {
    switch (action.type) {
        case 'current-user-info-from-server': {
            // console.log(action)
            return {
                ...state,
                currentUser: {...action},
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
        case 'update-feed': {
            // console.log(action)
            return {
                ...state,
                postStatus: 'posted'
            };
        }
        default:
            throw new Error(`Unrecognized action: ${action.type}`);
    }
}


export const CurrentUserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const receiveCurrentUserFromServer = (data) => {
    dispatch({
        type: "current-user-info-from-server",
        ...data
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
        <CurrentUserContext.Provider
        value={{
            state,
            receiveCurrentUserFromServer,
            loadingStatus,
            updateFeed,
        }}
        >
        {children}
        </CurrentUserContext.Provider>
    );
}