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
        {name: "Acceuil", link: '/', icon: '' , alias: 'home'},
        {name: "L'Ecole", link: '/ecole', icon: <SchoolIcon fontSize="large" /> , alias:'ecole'},
        {name: "Vie Scolaire", link: '/vie-scolaire', icon: <DirectionsRunIcon  fontSize="large"/>, alias: 'viescolaire'},
        {name: "Les classes", link: '/classes', icon: <MeetingRoomIcon fontSize="large" />, alias:'classes'},
        {name: "Informations", link: '/informations', icon: <ListAltIcon  fontSize="large" />, alias: 'informations'},
        {name: "Mécènes", link: '/mecenes', icon: <ListAltIcon  fontSize="large" />, alias: 'mecenes'},
        {name: "Espace privé", link: '/private', icon: <AccountCircleIcon  fontSize="large" />, alias:'private'}
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