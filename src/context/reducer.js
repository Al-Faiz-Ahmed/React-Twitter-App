export let applModel = {
    authUser: {},
    authShow: 'initial-user',
    fetchTweet: 'off',
    allTweets: {},
    userOwnTweets: {},


}

export function reducer(state, action) {
    switch (action.type) {

        case 'REGISTER_USER':
            let usersClone = state.allUsers.slice(0);
            usersClone.push(action.payload);
            return {
                ...state,
                allUsers: usersClone,
                authUser: action.payload
            }
        case 'NEW_TWEET':
            return {
                ...state,
                fetchTweet: action.payload
            }
        case "Auth_USER": {
            return {
                ...state,
                authUser: action.payload
            }
        }
        case "AUTH_SHOWN": {
            return {
                ...state,
                authShow: action.payload
            }
        }
        case "USER_OWN_TWEETS": {
            let userTweetsClone = state.userOwnTweets
            userTweetsClone[action.payload.tweetId] = action.payload
            return {
                ...state,
                userOwnTweets: userTweetsClone
            }
        }
        case "ALL_TWEETS": {
            let allTweetsClone = state.allTweets
            allTweetsClone[action.payload.tweetId] = action.payload
            return {
                ...state,
                allTweets: allTweetsClone
            }
        }
        case "LOGOUT_USER": {
            return {
                authUser: {logout:'logout'},
                authShow: 'initial-user',
                fetchTweet: 'off',
                allTweets: {},
                userOwnTweets: {},
            }
        }

        default:
            return state
    }
}