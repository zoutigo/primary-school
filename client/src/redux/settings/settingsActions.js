import {OPEN_BURGER_MENU, OPEN_SUB_MENU} from './settingsActionsTypes'

export const openBurgerMenu = ()=> {
    return {
        type: OPEN_BURGER_MENU
    }
}

export const openSubMenu = (index)=> {
    return {
        type: OPEN_SUB_MENU ,
        payload: index
        
    }
}