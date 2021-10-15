import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/context';
import {
    auth, createUserWithEmailAndPassword,
    db,
    doc,
    setDoc
} from '../config/firebase';
import './app.css'

function SignupForm() {
    const { state, dispatch } = useContext(GlobalContext)
    const [usernameVal, setUsername] = useState('')
    const [emailVal, setEmail] = useState('')
    const [passVale, setPass] = useState('')
    const [emailErr, setEmailErr] = useState(false)
    const [passErr, setPassErr] = useState(false)
    let history = useHistory('')

        // Hook is checkong if user is already Login change the Route to Dashboard  
    useEffect(() => {
        let emptyObj = Object.keys(state.authUser)
        if (emptyObj.length !== 0) {
            history.push('/dashboard')
        }
    }, [state])

    // async function for sigup new User and send data to fireStore
    async function onSignUp() {
        if (usernameVal !== '' && emailVal !== '' && passVale !== '') {
            try {
                let { user } = await createUserWithEmailAndPassword(auth, emailVal, passVale)
                let uid = user.uid
                let dbRef = doc(db, 'users', uid)
                await setDoc(dbRef, {
                    uid: uid,
                    email: emailVal,
                    userName: usernameVal
                });
                dispatch({
                    type: 'Auth_USER',
                    payload: {
                        uid: uid,
                        email: emailVal,
                        userName: usernameVal
                    }
                })
                dispatch({
                    type:'AUTH_SHOWN',
                    payload:'user-found'
                })
            } catch (err) {
                if (err.message === 'Firebase: Error (auth/invalid-email).') {
                    setEmailErr(true)
                }
                if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    setPassErr(true)
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
                        <h2>Sign Up for twitter</h2>
                    </div>

                </div>
                <div className='inputDiv'>
                    <label htmlFor="username">Username</label>
                    <br />
                    <input onChange={(event) => { setUsername(event.target.value) }} value={usernameVal} id='username' type="text" />
                </div>
                <div className='inputDiv'>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input onChange={(event) => { setEmail(event.target.value) }} value={emailVal} id='email' type="text" />
                    {
                        emailErr ?
                            <p><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Invalid Email</p>
                            :
                            null
                    }
                </div>
                <div className='inputDiv'>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input onChange={(event) => { setPass(event.target.value) }} value={passVale} id='password' type="password" />
                    {
                        passErr
                            ?
                            <p><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Weak Password</p>
                            : null
                    }
                </div>

                <div className='signUpBtnDiv'><button onClick={onSignUp}>Sign Up</button></div>
                <div className='createAccLink'>
                    <div className='anchor'>
                        <Link className='link' to='/login'>Already have an account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignupForm