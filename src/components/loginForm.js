import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/context';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword  } from '../config/firebase';
import './app.css'
function LoginForm() {
    const  {state} = useContext(GlobalContext)
    const history = useHistory('')
    const [emailVal, setEmailVal] = useState('')
    const [passVal, setPassVal] = useState('')
    const [emailErr, setEmailErr] = useState([false,''])
    const [passErr, setPassErr] = useState([false,''])


    // Hook is checkong if user is already Login change the Route to Dashboard  
    useEffect(()=>{
        if(state.authUser.email !== undefined){
            history.push('/dashboard')
        }
    },[state.authUser])

    // asynchronous function for validate formFeild annd get response from Firebase  
    async function checkUser() {
        if (emailVal !== '' && passVal !== '') {
            try{
                await signInWithEmailAndPassword(auth,emailVal,passVal)
                
            }catch(err){
                if(err.message === 'Firebase: Error (auth/invalid-email).'){
                    setEmailErr([true,'Invaid email'])
                }
                if(err.message === 'Firebase: Error (auth/user-not-found).'){
                    
                    setEmailErr([true,'User email not found'])

                }
                if(err.message === 'Firebase: Error (auth/wrong-password).'){
                    setEmailErr('')
                    setPassErr([true,'Type correct password'])
                }
            }
        
        }
    }
    return (
        <div>
            <div className='formDiv'>
                <div>
                    <div className='TagLine'>
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                        <h2>Login for twitter</h2>
                    </div>
                    
                </div>
                <div className='inputDiv'>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input onChange={(e) => { setEmailVal(e.target.value) }} value={emailVal} id='email' type="text" />
                   
                    {
                        emailErr[0] ?
                            <p><i className="fa fa-exclamation-circle" aria-hidden="true"></i> {emailErr[1]}</p>
                            :
                            null
                    }
                </div>
                <div className='inputDiv'>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input onChange={(e) => { setPassVal(e.target.value) }} value={passVal} id='password' type="password" />
                    {
                        passErr[0]
                            ?
                            <p><i className="fa fa-exclamation-circle" aria-hidden="true"></i> {passErr[1]}</p>
                            : null
                    }
                </div>

                <div className='signUpBtnDiv'><button onClick={checkUser}>Log in</button></div>
                <div className='createAccLink'>
                    <div className='anchor'>
                        <Link className='link' to='/home'>Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginForm