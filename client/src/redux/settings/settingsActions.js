import {
  TOOGLE_SMALL_SCREEN_MENU,
  OPEN_SUB_MENU,
  OPEN_CATEGORY,
  SHOW_CLASSROOM,
  SHOW_PAPERS,
  SHOW_PAPER_FORM,
  TEST_SETTINGS_REDUCER,
  SET_SCROLL,
} from './settingsActionsTypes'

export const testSettings = (value) => {
  return {
    type: TEST_SETTINGS_REDUCER,
    payload: value,
  }
}

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
export const tooglePaperForm = () => {
  return {
    type: SHOW_PAPER_FORM,
  }
}

export const setScroll = (value) => {
  return {
    type: SET_SCROLL,
    payload: value,
  }
}
