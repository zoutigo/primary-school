import { useTheme } from '@material-ui/styles'
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

export const useLocationColor = () => {
  const [colors, setColors] = React.useState('')
  const { state } = useLocation()

  const theme = useTheme()

  const paletteColor = (alias) => {
    switch (alias) {
      case 'ecole':
        return theme.palette.ecole
      case 'vie-scolaire':
        return theme.palette.viescolaire
      case 'classes':
        return theme.palette.classes
      case 'informations':
        return theme.palette.informations
      case 'apel-ogec':
        return theme.palette.apelogec
      case 'private':
        return theme.palette.private

      default:
        return theme.palette.primary
    }
  }

  React.useEffect(() => {
    if (state && state.rubric) {
      setColors(paletteColor(state.rubric.alias))
    }

    return () => {
      setColors('')
    }
  }, [state])
  return colors
}
