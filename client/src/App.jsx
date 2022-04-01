import React from 'react'; 
import { StreamChat } from 'stream-chat'; 
import { Chat } from 'stream-chat-react'; 
import Cookies from 'universal-cookie'; 

import { ChannelListContainer, ChannelContainer, auth } from './components'

const apiKey = 'uyy5r9br9hdk'; 

const client = StreamChat.getInstance(apiKey); 

const authToken = false; 

const App = () => {
    if (!authoToken) return <Auth/>
    return (
        <div className='app_wrapper'>
            <Chat client={client} theme='team light'> 
                <ChannelListContainer
                />
                <ChannelContainer
                />
            </Chat>
            <h1>Title</h1>
        </div>
    )
}

export default App