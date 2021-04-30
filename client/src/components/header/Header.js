import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Toolbar, IconButton, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { toogleSmallScreenMenu } from '../../redux/settings/settingsActions'
import NavItem from './NavItem'

import MenuIcon from '@material-ui/icons/Menu'
import CancelIcon from '@material-ui/icons/Cancel'

import rubrics from '../../utils/rubrics'

import Logo from './Logo'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px',
    margin: '0px',
    maxHeight: '12vh',
    marginTop: '10vh',
    background: 'white',
    boxSizing: 'border-box',
    boxShadow: 'none',
  },

  contentSmall: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '100%',
    '& > :last-child': {
      marginRight: '7vw',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
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
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}))

function Header() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const smallScreenMenuIsOpened = useSelector(
    (state) => state.settings.smallScreenMenuIsOpened
  )

  const ToogleButton = ({ className }) => {
    if (smallScreenMenuIsOpened) {
      return <CancelIcon className={className} />
    }
    return <MenuIcon className={className} />
  }
  ToogleButton.propTypes = {
    className: PropTypes.object,
  }

  return (
    <AppBar className={`${classes.root}`}>
      <Toolbar>
        <Grid container>
          <Grid item container className={classes.medium}>
            <Grid item md={false} lg={2}>
              <Logo />
            </Grid>
            <Grid item container md={false} lg={10}>
              {rubrics.map((rubric, index) => {
                if (rubric.alias !== 'home') {
                  return (
                    <Grid item md={false} lg={2} key={index}>
                      <NavItem key={index} rubric={rubric} ind={index} />
                    </Grid>
                  )
                }
                return null
              })}
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item className={classes.contentSmall}>
              {/* <Logo className={`${classes.smallIconsSizes} `} /> */}
              <Logo />
              <div>
                <IconButton onClick={() => dispatch(toogleSmallScreenMenu())}>
                  <ToogleButton
                    className={`${classes.smallIconsSizes} ${classes.burgerColor}`}
                  />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
