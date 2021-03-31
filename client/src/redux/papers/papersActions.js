import {
  SET_SHOW_PAPERS_BUTTON_GROUP,
  SET_SHOW_PAPERS_FORM,
  SET_SHOW_PAPERS_LIST,
  SET_SHOW_PAPERS_ITEMS,
  SET_SHOW_PAPERS_INNER_FORM,
  SET_CURRENT_PAPER_ITEM,
} from './papersActionsTypes'

export const setShowPapersList = (value) => {
  return {
    type: SET_SHOW_PAPERS_LIST,
    payload: value,
  }
}
export const setShowPapersButtonGroup = (value) => {
  return {
    type: SET_SHOW_PAPERS_BUTTON_GROUP,
    payload: value,
  }
}
export const setShowPapersForm = (value) => {
  return {
    type: SET_SHOW_PAPERS_FORM,
    payload: value,
  }
}
export const setShowPapersItems = (value) => {
  return {
    type: SET_SHOW_PAPERS_ITEMS,
    payload: value,
  }
}
export const setShowPapersInnerForm = (value) => {
  return {
    type: SET_SHOW_PAPERS_INNER_FORM,
    payload: value,
  }
}
export const setCurrentPaperItem = (datas) => {
  return {
    type: SET_CURRENT_PAPER_ITEM,
    payload: datas,
  }
}
