import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  testSettings: 'valid',
  smallScreenMenuIsOpened: false,
  Scroll: false,
  displayClassroom: true,
  displayPapers: false,
  displayPaperForm: false,
  pages: [],
}

export const settingsReducers = createReducer(initialState, {
  TOOGLE_SMALL_SCREEN_MENU: (state) => {
    state.smallScreenMenuIsOpened = !state.smallScreenMenuIsOpened
  },
  OPEN_SUB_MENU: (state, action) => {
    state.rubrics[action.payload].subdisplay = !state.rubrics[action.payload]
      .subdisplay
  },
  OPEN_CATEGORY: (state, action) => {
    state.rubrics[action.payload[0]].categories[action.payload[1]] = !state
      .rubrics[action.payload[0]].categories[action.payload[1]]
  },
  SHOW_PAPERS: (state, action) => {
    state.displayPapers = action.payload || !state.displayPapers
  },
  SET_PAGES: (state, action) => {
    state.pages = action.payload
  },
  SHOW_CLASSROOM: (state, action) => {
    state.displayClassroom = action.payload || !state.displayClassroom
  },
  SHOW_PAPER_FORM: (state) => {
    state.displayPaperForm = !state.displayPaperForm
  },
  SET_SCROLL: (state, action) => {
    state.Scroll = action.payload
  },
})
