import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/context';
import { signOut, auth, db, collection, query, where, onSnapshot } from "../config/firebase";
import { useHistory } from 'react-router';

export default function Tweets({ showPanel }) {
    const { state, dispatch } = useContext(GlobalContext)
    let history = useHistory('')

    // this useState is checking the newly Added Data or tweet in fireStore
    const [fromAddData, getAddedData] = useState({})

    // Hook is checking if new tweet save succefully in fireStore then close add tweet window     
    useEffect(() => {
        dispatch({
            type: 'NEW_TWEET',
            payload: 'off'
        })
    }, [fromAddData])

    // hook for receiving user Own tweet and dispatching in reducer
    useEffect(() => {
        if (state.authUser.uid !== undefined) {
            const q = query(collection(db, "tweets"), where("uid", "==", state.authUser?.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        getAddedData(change.doc.data())

                        dispatch({
                            type: 'USER_OWN_TWEETS',
                            payload: change.doc.data()
                        })
                    }
                });
            });
            const allTweetq = query(collection(db, "tweets"));
            const unsub = onSnapshot(allTweetq, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        dispatch({
                            type: 'ALL_TWEETS',
                            payload: change.doc.data()
                        })
                    }

                });
            });
        }
    }, [state.authUser])

    // hook for logout user and change the route to login 
    useEffect(() => {
        if (state.authUser.logout === 'logout') {
            history.push('/login')
        }
    }, [state.authUser])

    // async function for logout User and to Empty the Whole Reducer   
    async function userLogOut() {
        await dispatch({
            type: 'LOGOUT_USER',
            payload: true
        })
        signOut(auth).then(() => {
        })
    }
    return (
        <div className='panelPArent'>
            {
                showPanel === 'tweet'
                    ?
                    <div>
                        {
                            Object.keys(state.allTweets).map((data, index) => {
                                let { date, dislikes, likes, tweet, tweetId, userName } = state.allTweets[data]
                                return (
                                    <div className='cardParent' key={data}>
                                        <div className="cardBegining" id={tweetId}>
                                            <h2 className='userName'>@{userName}</h2>
                                            <div className="date">
                                                {date}
                                            </div>
                                            <div className="tweetPara">
                                                {tweet}
                                            </div>
                                            <div className='actionBtn'>
                                                <div>
                                                    <button><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> {likes}</button>
                                                </div>
                                                <div>
                                                    <button><i className="fa fa-thumbs-o-down" aria-hidden="true"></i> {dislikes}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                    : null}
            {
                showPanel === 'my_tweet' ?
                    <div>
                        <div>
                            {
                                Object.keys(state.userOwnTweets).map((data, index) => {
                                    let { date, dislikes, likes, tweet, tweetId, userName } = state.userOwnTweets[data]
                                    return (
                                        <div className='cardParent' key={data}>
                                            <div className="cardBegining" id={tweetId}>
                                                <h2 className='userName'>@{userName}</h2>
                                                <div className="date">
                                                    {date}
                                                </div>
                                                <div className="tweetPara">
                                                    {tweet}
                                                </div>
                                                <div className='actionBtn'>
                                                    <div>
                                                        <button><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> {likes}</button>
                                                    </div>
                                                    <div>
                                                        <button><i className="fa fa-thumbs-o-down" aria-hidden="true"></i> {dislikes}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div> : null
            }
            {
                showPanel === 'profile' ?
                    <div className='ProfilePanel'>
                        <div className="profileUsername">
                            <p>Username</p>
                            <h2>{state.authUser.userName}</h2>
                        </div>
                        <div className="profileEmail">
                            <p>Email</p>
                            <h2>{state.authUser.email}</h2>
                        </div>
                        <div className='profileBtn'>
                            <button onClick={userLogOut}>Log out</button>
                        </div>
                    </div> : null
            }
        </div>
    )
}


