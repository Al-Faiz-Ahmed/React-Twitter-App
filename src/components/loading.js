import React, { useState,useEffect,useContext } from 'react';
import { GlobalContext } from '../context/context';
import './app.css'


// This Loading Component Only Shown When Fetching the User Cradential Already Login Or not 

export default function LoadingScreen(){
    const {state} = useContext(GlobalContext)

    const [displaySignupRoute,setDisplaySignupRoute] = useState('flex')
    
    useEffect(()=>{
        if(state.authShow === 'user-not-found'){
            setDisplaySignupRoute('none')
        }
        if(state.authShow === 'user-found'){
            setDisplaySignupRoute('none')
        }
    },[state.authShow])
    return(
        <div style={{display:displaySignupRoute}} className='frontend-Loading'>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
    )
}
