import {
  TOOGLE_SMALL_SCREEN_MENU,
  OPEN_SUB_MENU,
  OPEN_CATEGORY,
  SHOW_CLASSROOM,
  SHOW_PAPERS,
} from './settingsActionsTypes'

export const toogleSmallScreenMenu = () => {
  return {
    type: TOOGLE_SMALL_SCREEN_MENU,
  }
}

export const openSubMenu = (index) => {
  return {
    type: OPEN_SUB_MENU,
    payload: index,
  }
}

export const openCategory = (rubricIndex, categoryIndex) => {
  return {
    type: OPEN_CATEGORY,
    payload: [rubricIndex, categoryIndex],
  }
}

export const showClassroom = () => {
  return {
    type: SHOW_CLASSROOM,
  }
}

export const showPapers = () => {
  return {
    type: SHOW_PAPERS,
  }
}
