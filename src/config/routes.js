import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../context/context";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../screens/home'
import Login from "../screens/login";
import Dashboard from "../screens/dashboard";
import { auth, onAuthStateChanged, db, doc, getDoc } from './firebase';
import LoadingScreen from "../components/loading";


function ReactRoutes() {
    const { dispatch } = useContext(GlobalContext);

    // first of All this effect checked the User already Login or not 
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserInfo(user.uid);
            }
            else {
                dispatch({ type: "AUTH_SHOWN", payload: 'user-not-found' });
            }
        })
    }, []);

    const fetchUserInfo = async (uid) => {
        let userRef = doc(db, 'users', uid);
        let userInfo = await getDoc(userRef);
        userInfo = userInfo.data();
        dispatch({ type: "Auth_USER", payload: userInfo });
        dispatch({
            type: 'AUTH_SHOWN',
            payload: 'user-found'
        })
    }
    return (
        <Router>
            <LoadingScreen />
            <Switch>
                <Route path='/dashboard'>
                    <Dashboard />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}


export default ReactRoutes