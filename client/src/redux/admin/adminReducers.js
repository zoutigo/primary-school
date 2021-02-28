import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  pagesList: '',
  currentUpdatePage: '',
  adminItems: [
    {
      name: 'Pages du site',
      path: '/administration/pages',
      id: 3,
      subitems: [
        {
          name: 'Creer une page',
          path: '/administration/pages/creation',
          id: 'page-creation',
        },
        {
          name: 'Modifier une page',
          path: '/administration/pages/modification',
          id: 'page-update',
        },
      ],
    },
    {
      name: 'Gestion utilisateurs',
      path: '/administration/users',
      id: 0,
      subitems: [],
    },
    {
      name: 'Informations',
      path: '/administration/datas',
      id: 1,
      subitems: [],
    },
    {
      name: 'Classes',
      path: '/administration/classrooms',
      id: 2,
      subitems: [],
    },
  ],
}

export const adminReducers = createReducer(initialState, {
  SET_PAGES_LIST: (state, action) => {
    state.pagesList = action.payload
  },
  SET_CURRENT_UPDATE_PAGE_ALIAS: (state, action) => {
    state.currentUpdatePage = action.payload || ''
  },
})
