import React,{useState,useEffect,useContext} from 'react';
import LoginForm from '../components/loginForm';
import { GlobalContext } from '../context/context';
function Login() {
    const {state} = useContext(GlobalContext)
    const [displaySignupRoute,setDisplaySignupRoute] = useState('none')    
    // hook is fetching (reducer authshown) to close the loading component 
    
    useEffect(()=>{
        if(state.authShow === 'user-not-found'){
            setDisplaySignupRoute('block')
        }
    },[state.authShow])
    return (
        <div style={{display:displaySignupRoute}}>
            <LoginForm />
        </div>
    )
}
export default Login