import React from 'react'
import {ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'; 
import HospitalIcon from ''

const SideBar = () => { 
    <div className="channel-list_sidebar">
        <div className="channel-list_sidebar__icon1"> 
            <div className="icone__inner"> 
                <img src={HostpialIcon} alt="Hospital" width='30'></img> 
            </div>
        </div>
    </div> 
}

const CompanyHeader = () =>{ 
    <div className='channel-list__header'>
        <p className="channel-list__header__text">Medical Pager</p>
    </div>
}

const ChannelListContainer = () => {
  return (
    <>
        <SideBar/>
        <div className="channel-list__list__wrapper"> 
            <CompanyHeader/>
            <ChannelSearch/>
        </div>
    </>
  )
}

export default ChannelListContainer