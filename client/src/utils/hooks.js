import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

export const useDispatchOnRouteChange = (someFetchActionCreator) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  React.useEffect(() => {
    dispatch(someFetchActionCreator())
  }, [pathname])
}
