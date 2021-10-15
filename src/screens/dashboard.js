import React, { useState } from 'react';
import Navbar from '../components/navbar';
import NewTweet from '../components/newTweet';
import Tweet from '../components/tweets';

export default function Dashboard() {
    const [getRoute, setRoute] = useState('tweet')

    // this function recieving callback info in parameter from Navbar Component
    function getPageInfo(info) {

        // save info in useState to send it tweet Panel
        setRoute(info)
    }

    return (
        <div>

            {/* sending callback function in props */}
            <Navbar getInfo={getPageInfo} />
            <div>
                <NewTweet />
            </div>
            <div>
                {/* sending info from state that which tweet screen to shown*/}
                <Tweet showPanel={getRoute} />
            </div>
        </div>
    )
}