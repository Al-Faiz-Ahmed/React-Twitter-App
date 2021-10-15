import React,{useState,useEffect,useContext} from 'react';
import SignupForm from '../components/signupForm';
import { GlobalContext } from '../context/context';


function Signup(){
    const {state} = useContext(GlobalContext)
    const [displaySignupRoute,setDisplaySignupRoute] = useState('none')    
    
    // hook is fetching (reducer authshown) to close the loading component 
    useEffect(()=>{
        if(state.authShow === 'user-not-found'){
            setDisplaySignupRoute('block')
        }
    },[state.authShow])
    return(
        <div style={{display:displaySignupRoute}}>
            <SignupForm />
        </div>
    )
}




export default Signup