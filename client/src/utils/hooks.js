import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setScroll } from '../redux/settings/settingsActions'
import { setTokenValidity } from '../redux/user/userActions'

export const useDispatchOnRouteChange = (someFetchActionCreator) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  React.useEffect(() => {
    dispatch(someFetchActionCreator())
  }, [pathname])
}

export const useScroll = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        dispatch(setScroll(true))
      } else {
        dispatch(setScroll(false))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
