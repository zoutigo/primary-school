import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'

import { Box, styled, Typography } from '@material-ui/core'

import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useEffect } from 'react'
import {
  setCredentials,
  setIsLogged,
  setToken,
} from '../../redux/user/userActions'
import { StyledNavLink } from '../../utils/componentsStyled'
import TextLink from './TextLink'
import SubTextLink from './SubTextLink'
import { useLocationColor, usePaletteColors } from '../../utils/hooks'

const useStyles = makeStyles((theme) => ({
  icon: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    color: 'white',
  },
  navLink: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    display: 'inline-block',
  },

  iconActive: {
    color: theme.palette.common.black,
    transform: 'scale(1.5)',
  },

  lineNotActive: {
    minHeight: '3px',
    minWidth: '2px',
    background: 'transparent',
  },
  lineActive: {
    minHeight: '3px',
    minWidth: '2px',
    background: theme.palette.primary.main,
    // marginBottom: theme.spacing(3)
  },
  // hoveredLink: {
  //   textAlign: 'center',
  //   background: 'green',
  //   color: 'red',
  // },
  link: {
    textAlign: 'center',
    background: 'transparent',
    minWidth: '100%',
    '&:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    // [theme.breakpoints.up('lg')]: {
    //   minWidth: '13rem',
    // },
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'block',
  },
  root: {
    // '& nav': {
    //   width: '100%',
    // },
    // '&:hover': {
    //   // background:theme.palette.primary.main,
    //   '& >div': {
    //     display: 'block',
    //   },
    // },
  },

  rootClicked: {
    // maxWidth: '10em',
    // minWidth: '5em',
    // '&:hover': {
    //   background: theme.palette.primary.main,
    // },
  },
}))

const StyledNavItem = styled(Box)(({ theme, clicked }) => ({
  minHeight: '100%',
  minWidth: '100%',
  '& nav': {
    width: '100%',
  },
  '&:hover': {
    // background:theme.palette.primary.main,
    '& >div': {
      display: 'block',
    },
  },
}))

const StyledTitleLink = styled(StyledNavLink)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  display: 'inline-block',
}))

function NavItem({ rubric, ind }) {
  const theme = useTheme()
  const { name, link, icon, categories, alias } = rubric

  const classes = useStyles()
  const { pathname } = useLocation()

  const dispatch = useDispatch()
  const history = useHistory()

  const { isLogged, Token } = useSelector((state) => state.user)
  const { tokenIsValid } = Token
  const [clicked, setClicked] = useState(false)

  const activeIcon =
    link === pathname ? classes.iconActive : classes.iconNotActive
  const activeLine =
    link === pathname ? classes.lineActive : classes.lineNotActive

  useEffect(() => {
    const handleClick = () => {
      setClicked(false)
    }
    window.addEventListener('mousemove', handleClick)
    return () => {
      window.removeEventListener('mousemove', handleClick)
    }
  }, [clicked])

  const handleLoggout = () => {
    dispatch(setIsLogged())
    dispatch(setToken(null))
    dispatch(setCredentials({}))
    history.push('/')
  }

  const rubriccolors = usePaletteColors(alias)

  return (
    <StyledNavItem>
      <nav onClick={() => setClicked(true)}>
        <div
          className={`${classes.icon} ${activeIcon}`}
          style={{ color: `${rubriccolors.main}` }}
        >
          {' '}
          {icon}{' '}
        </div>
        <TextLink
          {...rubric}
          isLogged
          clicked
          pathname
          rubriccolors={rubriccolors}
        />

        <div className={activeLine}></div>
      </nav>

      <SubTextLink
        {...rubric}
        pathname
        clicked
        setClicked={setClicked}
        handleLoggout={handleLoggout}
        rubriccolors={rubriccolors}
      />
    </StyledNavItem>
  )
}

export default NavItem
