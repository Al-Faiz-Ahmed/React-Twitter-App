import React,{useState} from 'react';
import './app.css'
export default function Navbar({getInfo}) {
    const [animateLine,setAnimation]  = useState('0')

    // function for animating CSS Navigator Bottom Blue Line
    function navigateAnimate(value){
        if(value ===  'tweet'){
            setAnimation('0')
        }
        if(value ===  'my_tweet'){
            setAnimation('50%')
        }
        getInfo(value)
    }


    return (
        <div>
            <div className="navBar">
                <div className="logo"><i className="fa fa-twitter" aria-hidden="true"></i></div>
                <div className="tweets">
                    <div onClick={()=> navigateAnimate('tweet') } className='tweet'>Tweets</div>
                    <div onClick={()=> navigateAnimate('my_tweet') } className="my__tweet">My Tweets</div>
                    <span style={{left:animateLine}}className='navigate__animate'></span>
                </div>
                <div onClick={()=> navigateAnimate('profile')} className="profile"><i className="fa fa-user-circle" aria-hidden="true"></i></div>
            </div>
        </div>
    )
}