import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'

import { Box, Typography } from '@material-ui/core'

import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useEffect } from 'react'
import {
  setCredentials,
  setIsLogged,
  setToken,
} from '../../redux/user/userActions'

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

  textActive: {
    color: theme.palette.success.main,
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
    '& nav': {
      width: '100%',
    },
    '&:hover': {
      // background:theme.palette.primary.main,
      '& >div': {
        display: 'block',
      },
    },
  },

  rootClicked: {
    maxWidth: '10em',
    minWidth: '5em',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },

  dropdownContent: {
    display: 'none',
    position: 'absolute',
    zIndex: 1,
    minWidth: '15em',
    background: theme.palette.primary.main,
  },
  dropdownLink: {
    position: 'relative',
    display: 'block',
    minHeight: theme.spacing(5),
    borderTop: 'white solid 1px',
    '&:hover ': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      '& div': {
        display: 'inline-block',
      },
    },
    '& div': {
      display: 'none',
      background: 'pink',
      position: 'absolute',
      top: 0,
      left: '100%',
      minWidth: '15em',
      zIndex: 1,
      '& li': {
        display: 'block',
        minHeight: '3em',
        background: theme.palette.primary.light,
        color: 'black',
        borderTop: 'white solid 1px',
      },
      '& li:hover': {
        background: theme.palette.secondary.main,
        color: theme.palette.primary.main,
      },
    },
  },
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

  const activeRoot =
    link === pathname ? classes.rootActive : classes.rootNotActive
  const activeIcon =
    link === pathname ? classes.iconActive : classes.iconNotActive
  const activeLine =
    link === pathname ? classes.lineActive : classes.lineNotActive

  const activeText =
    link === pathname ? classes.textActive : classes.textNotActive

  const wasClicked = clicked ? classes.rootClicked : classes.root

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

  const iconsColors = [
    theme.palette.ecole.main,
    theme.palette.viescolaire.main,
    theme.palette.classes.main,
    theme.palette.informations.main,
    theme.palette.apelogec.main,
    theme.palette.private.main,
  ]

  return (
    <div
      className={`${wasClicked} ${activeRoot}`}
      style={{ minHeight: '100%' }}
    >
      <nav onClick={() => setClicked(true)}>
        <div
          className={`${classes.icon} ${activeIcon}`}
          style={{ color: `${iconsColors[ind - 1]}` }}
        >
          {' '}
          {icon}{' '}
        </div>
        <div className={classes.link}>
          <NavLink
            to={{
              pathname: link,
              categories: categories,
              state: {
                from: pathname,
                rubric: {
                  name: name,
                  alias: alias,
                },
              },
            }}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            className={`${classes.navLink} ${activeText}}`}
          >
            <Typography
              variant="h6"
              style={{ marginLeft: '8px', marginRight: '8px' }}
            >
              {alias !== 'private'
                ? name
                : isLogged
                ? 'Espace Privé'
                : `S'identifier`}
            </Typography>
          </NavLink>
        </div>

        <div className={activeLine}></div>
      </nav>

      <div className={`${classes.dropdownContent} `}>
        {categories &&
          categories.map(
            (category, index) => {
              return rubric.alias === 'private' &&
                isLogged &&
                (category.alias === 'login' ||
                  category.alias === 'register') ? null : rubric.alias ===
                  'private' &&
                !isLogged &&
                (category.alias === 'loggout' ||
                  category.alias === 'my-account') ? null : (
                <div
                  key={index}
                  className={`${classes.dropdownLink} `}
                  onClick={() => setClicked(true)}
                >
                  {category.alias === 'loggout' ? (
                    <Typography
                      variant="h6"
                      style={{ marginLeft: '8px', cursor: 'pointer' }}
                      onClick={handleLoggout}
                    >
                      {category.designation}
                    </Typography>
                  ) : (
                    <NavLink
                      to={{
                        pathname: category.link,
                        rubric: name,
                        category: category.designation,
                        chapters: category.chapters,
                        state: {
                          from: pathname,
                          rubric: {
                            name: name,
                            alias: alias,
                          },
                          category: {
                            name: category.designation,
                            alias: category.alias,
                            chapters: category.chapters,
                          },
                        },
                      }}
                      style={{ color: 'inherit', textDecoration: 'inherit' }}
                    >
                      <Typography variant="h6" style={{ marginLeft: '8px' }}>
                        {' '}
                        {category.designation}{' '}
                      </Typography>
                    </NavLink>
                  )}

                  <div>
                    {category.chapters &&
                      category.chapters.map((chapter, ind) => {
                        return (
                          <li key={ind}>
                            <NavLink
                              style={{
                                color: 'inherit',
                                textDecoration: 'inherit',
                              }}
                              to={{
                                pathname: chapter.link,
                                chapter: chapter.designation,
                                state: {
                                  from: pathname,
                                  rubric: {
                                    name: name,
                                    alias: alias,
                                  },
                                  category: {
                                    name: category.designation,
                                    alias: category.alias,
                                  },
                                  chapter: {
                                    name: chapter.designation,
                                    alias: chapter.alias,
                                  },
                                },
                              }}
                            >
                              <Typography
                                variant="h6"
                                style={{
                                  marginLeft: '8px',
                                  marginRight: '8px',
                                }}
                              >
                                {' '}
                                {chapter.designation}{' '}
                              </Typography>
                            </NavLink>
                          </li>
                        )
                      })}
                  </div>
                </div>
              )
            }
            // end of the map
          )}
      </div>
    </div>
  )
}

export default NavItem
