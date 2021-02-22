import { createReducer } from '@reduxjs/toolkit'

import {
  TOOGLE_SMALL_SCREEN_MENU,
  OPEN_SUB_MENU,
  OPEN_CATEGORY,
  SHOW_PAPERS,
  SHOW_CLASSROOM,
  SHOW_PAPER_FORM,
  TEST_SETTINGS_REDUCER,
  SET_SCROLL,
} from './settingsActionsTypes'
import rubrics from '../../utils/rubrics'

const initialState = {
  testSettings: 'valid',
  smallScreenMenuIsOpened: false,
  Scroll: false,
  displayClassroom: true,
  displayPapers: false,
  displayPaperForm: false,
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

// export const settingReducers = (state = initialState, action) => {
//   switch (action.type) {
//     case TEST_SETTINGS_REDUCER:
//       return {
//         ...state,
//         testSettings: action.payload,
//       }
//     case TOOGLE_SMALL_SCREEN_MENU:
//       return {
//         ...state,
//         smallScreenMenuIsOpened: !state.smallScreenMenuIsOpened,
//       }

//     case OPEN_SUB_MENU: {
//       return {
//         ...state,
//         rubrics: {
//           ...state.rubrics,
//           [action.payload]: {
//             ...state.rubrics[action.payload],
//             subdisplay: !state.rubrics[action.payload.subdisplay],
//           },
//         },
//       }
//     }

//     case OPEN_CATEGORY: {
//       const newRubrics = [...state.rubrics]
//       newRubrics[action.payload[0]].categories[
//         action.payload[1]
//       ].subdisplay = !newRubrics[action.payload[0]].categories[
//         action.payload[1]
//       ].subdisplay
//       return {
//         ...state,
//         rubrics: newRubrics,
//       }
//     }
//     case SHOW_PAPERS:
//       return {
//         ...state,
//         displayPapers: action.payload || !state.displayPapers,
//       }
//     case SHOW_CLASSROOM:
//       return {
//         ...state,
//         displayClassroom: action.payload || !state.displayClassroom,
//       }
//     case SHOW_PAPER_FORM:
//       return {
//         ...state,
//         displayPaperForm: !state.displayPaperForm,
//       }

//     default:
//       return initialState
//   }
// }
