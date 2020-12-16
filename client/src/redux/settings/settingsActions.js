import {TOOGLE_SMALL_SCREEN_MENU, OPEN_SUB_MENU, OPEN_CATEGORY} from './settingsActionsTypes'

export const toogleSmallScreenMenu = ()=> {
    return {
        type: TOOGLE_SMALL_SCREEN_MENU
    }
}

export const openSubMenu = (index)=> {
    return {
        type: OPEN_SUB_MENU ,
        payload: index
        
    }
}

export const openCategory = (rubricIndex, categoryIndex)=>{
    return {
        type: OPEN_CATEGORY,
        payload: [rubricIndex, categoryIndex]
    }
}
