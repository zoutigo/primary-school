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

export const showClassroom = (value) => {
  return {
    type: SHOW_CLASSROOM,
    payload: value,
  }
}

export const showPapers = (value) => {
  return {
    type: SHOW_PAPERS,
    payload: value,
  }
}
