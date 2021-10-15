import React, { useState,useEffect,useContext } from 'react';
import { useHistory } from 'react-router';
import { db,collection,doc,setDoc } from '../config/firebase';
import { GlobalContext } from '../context/context';
let tweetDate;
export default function NewTweet() {
    const {state,dispatch} = useContext(GlobalContext)
    const [inputHeight, setInputHeight] = useState({row: '1',})
    const [showButton, setBtnDisplay] = useState(false)
    const [tweetVal,setTweetVal] = useState('')
    let history = useHistory('')



    // This Hook Runs Once and checked that no one supiciously acces dashboard Route 
    useEffect(()=>{
        if(!state.authUser.email){
            history.push('/login')
        }
    }
    ,[])

    // Hook check reducer (fetchtweet State) to Apply CSS on New Tweet 
    useEffect(()=>{
        if(state.fetchTweet === 'on'){
            setInputHeight({
                row: '6',
                divHeight: {
                    overFlow: 'hidden',
                    width: '100%',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    height: '100vh',
                    backgroundColor: 'white',
                    zIndex: '11',
                    paddingLeft: '20px',
                },
                texAreaStyling: {
                    marginTop: '20px',
                    maxWidth: '600px',
                    width: '50%',
                    borderRadius: '20px'
                }
            })
            setBtnDisplay(true)

        }
        if(state.fetchTweet === 'off'){
            setBtnDisplay(false)
            setInputHeight({
                row: '1',
            })
            setTweetVal('')
        }
    },[state.fetchTweet])

    //Hook is dispatching or Updating reducer of (fetchtweet) 
    function automateHeight(value) {
        if(value === 'on'){
            dispatch({
                type:'NEW_TWEET',
                payload:'on'
            })
        }else{
            dispatch({
                type:'NEW_TWEET',
                payload:'off'
            })
        }
    }

    // asyc function to save data or tweet in FireStore
    async function addTweet(){
        if(tweetVal){
            let setDate = new Date()
            let monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']  
            let month = monthArr[setDate.getMonth()]
            let date = setDate.getDate()
            
            if(date < 10){
                 tweetDate = `0${date} ${month}`                
                }else{
                    tweetDate = `${date} ${month}`                
            }  
            
            const newTweetRef = doc(collection(db, "tweets"));
            let newTweet = {
                tweetId:newTweetRef.id,
                userName: state.authUser.userName,
                email: state.authUser.email,
                uid: state.authUser.uid,
                date: tweetDate,
                tweet:tweetVal, 
                likes: 0,
                dislikes: 0
            }
              await setDoc(newTweetRef, newTweet);
        }
    }
    return (
        <div className='newTweet' >
            <div style={inputHeight.divHeight}>
                <textarea maxLength='280' value={tweetVal} onChange={(e)=>{setTweetVal(e.target.value)}} style={inputHeight.texAreaStyling} onClick={()=>{automateHeight('on')}} rows={inputHeight.row} placeholder='Want to tweet ?' ></textarea>
                {
                    showButton ? 
                    <div>
                    <button className='done' onClick={addTweet}>Done</button>
                    <button className='cancel'  onClick={()=>{automateHeight('off')}} >Cancel</button>
                </div> :
                null
                }
                
            </div>
            
        </div>
    )
}