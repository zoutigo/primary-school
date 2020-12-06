import {OPEN_BURGER_MENU, OPEN_SUB_MENU} from './settingsActionsTypes'
import React from 'react'
import rubrics from '../../utils/rubrics'


const initialState = {
    burgerMenuIsOpened : false,
    rubrics : rubrics
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
                const newRubrics = [...state.rubrics]
                newRubrics[action.payload].subdisplay = !newRubrics[action.payload].subdisplay

                return {
                    ...state,
                    rubrics : newRubrics
                }
            }
        
                
        default:
            return initialState
    }
}