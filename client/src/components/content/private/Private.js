import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { Grid } from '@material-ui/core'

import WelcomeMessage from './WelcomeMessage'
import Administration from './administration/Administration'
import MyDatas from './mydatas/MyDatas'
import MyDrafts from './drafts/MyDrafts'
import MyAgenda from './myagendas/MyAgendas'
import Wrapper from '../../wrappers/wrapper/Wrapper'

function Private() {
  const { state, pathname } = useLocation()

  const { isLogged, Credentials } = useSelector((state) => state.user)
  const { role } = Credentials
  const isAdmin = role === 'admin'

  if (!isLogged) {
    return (
      <Redirect
        to={{
          pathname: 'private/identification',
          state: {
            from: pathname,
            rubric: {
              name: state.rubric.name,
              alias: state.rubric.alias,
            },
          },
        }}
      />
    )
  }

  const pages = [
    {
      title: `Administration`,
      content: <Administration />,
    },
    {
      title: `Informations personnelles`,
      content: <MyDatas />,
    },
    {
      title: `Moderation`,
      content: <MyDatas />,
    },
    {
      title: `Agenda`,
      content: <MyDatas />,
    },
  ]

  // const aside = {
  //   title: 'Quelques chiffres',
  //   items: [
  //     {
  //       subtitle: 'Les inscrits',
  //       text: '1567',
  //     },
  //     {
  //       subtitle: 'Les articles',
  //       text: '627',
  //     },
  //   ],
  // }

  const datas = { pages }
  return <Wrapper {...datas} />
}

export default Private
