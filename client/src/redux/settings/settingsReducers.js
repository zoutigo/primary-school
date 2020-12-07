import {TOOGLE_SMALL_SCREEN_MENU, OPEN_SUB_MENU} from './settingsActionsTypes'
import React from 'react'
import rubrics from '../../utils/rubrics'


const initialState = {
    smallScreenMenuIsOpened : false,
    rubrics : rubrics
}

export const settingsReducers = (state=initialState, action)=> {
    switch (action.type) {
        case TOOGLE_SMALL_SCREEN_MENU:
            return {
                ...state,
                smallScreenMenuIsOpened : !state.smallScreenMenuIsOpened
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