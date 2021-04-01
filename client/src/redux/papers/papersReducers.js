import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  showPaperForm: false,
  showPaperInnerForm: false,
  showPaperList: true,
  showPaperItems: true,
  formAction: '',
  currentPaperItem: {},
}

export const papersReducers = createReducer(initialState, {
  SET_SHOW_PAPERS_FORM: (state, action) => {
    state.showPaperForm = action.payload
  },
  SET_SHOW_PAPERS_LIST: (state, action) => {
    state.showPaperList = action.payload
  },
  SET_SHOW_PAPERS_ITEMS: (state, action) => {
    state.showPaperItems = action.payload
  },
  SET_CURRENT_PAPER_ITEM: (state, action) => {
    state.currentPaperItem = action.payload
  },
  SET_FORM_ACTION: (state, action) => {
    state.formAction = action.payload
  },
})
