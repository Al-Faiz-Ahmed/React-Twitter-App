import React,{useState,useEffect} from 'react';
import axios from  'axios'

function FreeApi(){
    const URL = 'https://api.agify.io?name=faizan';
    
    const [currentApi,setApi] = useState([])

    useEffect( () => {
        async function fetchdata(){
            let {data} = await axios.get(URL);
            setApi(data);

        }
        fetchdata()
    }, []);

    useEffect(() => {
        console.log(currentApi.name);
    }, [currentApi])

    // let whatherapi = await axios.get('https://www.weatherbit.io/')
    // whatherapi.then((data)=>{
    //     setApi(data)
    //     console.log('***',currentApi)
        
    // })

   

    return(
        <div>
            <h2>ghg</h2>
        </div>
    )
}


export default FreeApi