import React,{useContext} from 'react';
import { GlobalContext } from '../context/context';



function DevelopmentOfContext(){

    let {state,dispatch} = useContext(GlobalContext)
    console.log(state)
    function upadtePrice(){
        dispatch({
            type:'UPDATE_PRICE',
            payload:"$1000"
        })
    }
    return(
        <div>
            <h2>{state.model}</h2>
            <p>Price {state.price}</p>
            <button onClick={upadtePrice}>Update</button>
        </div>
    )
}
export default DevelopmentOfContext