import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Toolbar, Box, IconButton, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NavLink, useLocation } from 'react-router-dom'

import {
  setPages,
  toogleSmallScreenMenu,
} from '../../redux/settings/settingsActions'
import NavItem from './NavItem'

import MenuIcon from '@material-ui/icons/Menu'
import CancelIcon from '@material-ui/icons/Cancel'

import logo from '../../images/logo3.png'
import rubrics from '../../utils/rubrics'
import { useQuery } from 'react-query'
import { apiFecthAllPages } from '../../utils/api'
import Logo from './Logo'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px',
    margin: '0px',
    maxHeight: '12vh',
    marginTop: '10vh',
  },

  toolbar: {},
  contentLarge: {
    minWidth: '85vw',
    display: 'flex',
    marginLeft: '7vw',
    alignItems: 'center',
    '& > :first-child': {
      flexGrow: 1,
    },
    '& > :last-child': {
      minWidth: '75%',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  contentSmall: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '100%',
    '& > :last-child': {
      marginRight: '7vw',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  scrolledStyle: {
    // background: theme.palette.primary.main,
    background: `linear-gradient(to bottom, ${theme.palette.primary.main} 75%, ${theme.palette.primary.light})`,
    boxShadow: 'inherit',
    transition: 'background 1s ease',
  },
  unscrolledStyle: {
    background: 'transparent',
    boxShadow: 'none',
    transition: 'background 1s ease',
  },
  logoLarge: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  smallIconsSizes: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },

  burgerColor: {
    color: theme.palette.warning.light,
  },
  logo: {
    background: 'none',
    width: '9rem',
    [theme.breakpoints.up('md')]: {
      width: '9rem',
    },
  },
  medium: {
    minHeight: '12vh',
    '& > *': {
      minHeight: '12vh',
    },
    '& >:first-child': {
      textAlign: 'center',
      paddingTop: '1.7%',
    },
    '& >:last-child': {
      alignSelf: 'center',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      overflow: 'hidden',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

function Header() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const Scroll = useSelector((state) => state.settings.Scroll)
  const headerColor = Scroll ? classes.scrolledStyle : classes.unscrolledStyle
  const smallScreenMenuIsOpened = useSelector(
    (state) => state.settings.smallScreenMenuIsOpened
  )

  const { pathname } = useLocation()
  const exception = pathname === '/'

  // const Logo = () => {
  //   return (
  //     <NavLink to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
  //       <img src={logo} alt="logo" className={classes.logo} />
  //     </NavLink>
  //   )
  // }

  const ToogleButton = ({ className }) => {
    if (smallScreenMenuIsOpened) {
      return <CancelIcon className={className} />
    }
    return <MenuIcon className={className} />
  }

  return (
    <AppBar className={`${classes.root} ${headerColor}`}>
      <Toolbar className={classes.toolbar}>
        <Grid container className={classes.medium} display="flex">
          <Grid item md={2} lg={2}>
            {/* <Logo className={classes.logo} /> */}
            <Logo />
          </Grid>
          <Grid item md={10} lg={10}>
            {rubrics.map((rubric, index) => {
              if (rubric.alias !== 'home') {
                return <NavItem key={index} rubric={rubric} ind={index} />
              }
              return null
            })}
          </Grid>
        </Grid>

        <Box className={classes.contentSmall}>
          {/* <Logo className={`${classes.smallIconsSizes} `} /> */}
          <Logo />
          <div>
            <IconButton onClick={() => dispatch(toogleSmallScreenMenu())}>
              <ToogleButton
                className={`${classes.smallIconsSizes} ${classes.burgerColor}`}
              />
            </IconButton>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
