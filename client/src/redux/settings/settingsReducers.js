import {OPEN_BURGER_MENU, OPEN_SUB_MENU} from './settingsActionsTypes'
import React from 'react'
import rubrics from '../../utils/rubrics'


const initialState = {
    burgerMenuIsOpened : false,
    navElements : rubrics
}

export const settingsReducers = (state=initialState, action)=> {
    switch (action.type) {
        case OPEN_BURGER_MENU:
            return {
                ...state,
                burgerMenuIsOpened : !state.burgerMenuIsOpened
            }
        case OPEN_SUB_MENU :
            
            {
                const newNavElements = [...state.navElements]
                newNavElements[action.payload].subdisplay = !newNavElements[action.payload].subdisplay

                return {
                    ...state,
                    navElements : newNavElements
                }
            }
        
                
        default:
            return initialState
    }
}