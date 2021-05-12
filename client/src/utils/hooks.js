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

export const useDispatchPaperFormMutation = (pivots, actions, cleanups) => {
  const dispatch = useDispatch()
  useEffect(() => {
    actions.forEach((action) => {
      const [actionner, value] = action
      dispatch(actionner(value))
    })
    return () => {
      cleanups.forEach((cleanup) => {
        const [cleaner, value] = cleanup
        dispatch(cleaner(value))
      })
    }
  }, pivots)
}

export const useDispatchOnMutation = (mutationStatus, action, value) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (mutationStatus) {
      dispatch(action(value))
    }
  }, [mutationStatus])
}

export const useDispatchOnMount = (action, value) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action(value))
  }, [])
}

export const useDispatchOnUnmount = (action, value) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const actionName = 'cleaner'
    return () => dispatch(action(value))
  }, [])
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

export const usePaletteColors = (alias) => {
  const theme = useTheme()

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

export const useLocationColor = () => {
  const [colors, setColors] = React.useState('')
  const { state } = useLocation()

  const theme = useTheme()

  React.useEffect(() => {
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
