import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

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
import { setPagesList } from '../../../redux/admin/adminActions'
import { useQuery } from 'react-query'
import { apiFecthAllPages } from '../../../utils/api'

function Private() {
  const dispatch = useDispatch()
  const { state, pathname } = useLocation()

  const { isLogged, Credentials } = useSelector((state) => state.user)
  const { role } = Credentials
  const isAdmin = role === 'admin'

  // load pageList in redux
  const { isLoading, isError, data, error } = useQuery(
    ['page-list'],
    apiFecthAllPages,
    {
      retry: 1,
      retryDelay: 500,
    }
  )
  if (isLoading) return <div>...isloading</div>
  if (isError) return <div>...{error}</div>

  dispatch(setPagesList(data))

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

  const datas = { pages }

  return <Wrapper {...datas} />
}

export default Private
