import {
  SET_CURRENT_UPDATE_PAGE_ALIAS,
  SET_PAGES_LIST,
} from './adminActionsTypes'

export const setPagesList = (list) => {
  return {
    type: SET_PAGES_LIST,
    payload: list,
  }
}

export const setCurrentUpdatePageAlias = (alias) => {
  return {
    type: SET_CURRENT_UPDATE_PAGE_ALIAS,
    payload: alias,
  }
}
