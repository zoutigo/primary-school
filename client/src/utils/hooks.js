import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setTokenValidity } from '../redux/user/userActions'

export const useDispatchOnRouteChange = (someFetchActionCreator) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  React.useEffect(() => {
    dispatch(someFetchActionCreator())
  }, [pathname])
}
