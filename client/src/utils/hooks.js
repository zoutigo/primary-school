import { useTheme } from '@material-ui/styles'
import React, { useCallback, useEffect, useState } from 'react'
import { useMutation, QueryCache, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setScroll } from '../redux/settings/settingsActions'
import { setTokenValidity } from '../redux/user/userActions'
import { notifyApiFailure, notifyFailure } from './notifications'

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

export const useToggle = () => {
  const [toggleState, setToggleState] = React.useState(false)

  const toggle = () => {
    setToggleState(!toggleState)
  }
  return { toggleState, toggle }
}

export const useLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  )

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value)
  }, [value])

  return [value, setValue]
}

export const useUpdateMutationOptions = (queryKey) => {
  const queryClient = useQueryClient()
  return {
    onMutate: (newData) => {
      queryClient.cancelQueries(queryKey)

      const current = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (prev) => newData)

      // in case there is no id , for post, it could be
      // queryCache.setQueryData(name, (prev)=> [...prev, {...newData, id:new Date().toISOString()}])
      return current
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(queryKey, (prev) => newData)
    },
    onError: (error, variables, context, newData, rollback) => {
      notifyApiFailure(error)
      rollback()
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  }
}

export const usePrefetch = async (queryKey, provider) => {
  const queryClient = useQueryClient()
  await queryClient.prefetchQuery(queryKey, provider)
}
