import {OPEN_BURGER_MENU} from './settingsActionsTypes'
import React from 'react'

import SchoolIcon from '@material-ui/icons/School';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';

const initialState = {
    burgerMenuIsOpened : false,
    navElements : [
        {name: "L'Ecole", link: '/school', icon: <SchoolIcon fontSize="large" /> },
        {name: "Les Activités", link: '/activities', icon: <DirectionsRunIcon  fontSize="large"/>},
        {name: "Les classes", link: '/classrooms', icon: <MeetingRoomIcon fontSize="large" />},
        {name: "Inscriptions", link: '/register', icon: <ListAltIcon  fontSize="large" />},
        {name: "Espace privé", link: '/private', icon: <AccountCircleIcon  fontSize="large" />}
    ]
}

export const settingsReducers = (state=initialState, action)=> {
    switch (action.type) {
        case OPEN_BURGER_MENU:
            return {
                ...state,
                burgerMenuIsOpened : !state.burgerMenuIsOpened
            }
        
                
        default:
            return initialState
    }
}