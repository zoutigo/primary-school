import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Administration from './administration/Administration'
import MyDatas from './mydatas/MyDatas'

import Wrapper from '../../wrappers/wrapper/Wrapper'
import { setPagesList } from '../../../redux/admin/adminActions'
import { useQuery } from 'react-query'
import { apiFecthAllPages } from '../../../utils/api'

function Private() {
  const dispatch = useDispatch()
  const { state, pathname } = useLocation()

  const { isLogged } = useSelector((state) => state.user)

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
