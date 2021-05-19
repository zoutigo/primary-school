import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { makeStyles, styled } from '@material-ui/styles'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

import { NavLink, useLocation } from 'react-router-dom'
import { Button, Typography, IconButton } from '@material-ui/core'

import SmallScreenMenuItem from './SmallScreenMenuItem'
import rubrics from '../../utils/rubrics'

import { toogleSmallScreenMenu } from '../../redux/settings/settingsActions'
import SmallScreenToogleShow from './HighOrderComponents/SmallScreenToogleShow'
import randomkey from '../../utils/randomkey'

const StyledSmallScreenMenu = styled('div')(({ theme }) => ({
  root: {
    minWidth: '100vw !important',
    zIndex: 100,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    top: '7em',
    transform: 'translate(0, -200%)',
  },
}))

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: '100vw',
    zIndex: 10000,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    top: '7em',
    transform: 'translate(0, -200%)',
  },
  box: {
    background: theme.palette.error.light,
    margin: '3px',
    display: 'flex',
    alignItems: 'center',
    height: '3rem',
  },
  text: {
    marginLeft: theme.spacing(3),
  },
  link: {
    flexGrow: 1,
    paddingLeft: '6vw',
  },
  button: {
    background: theme.palette.warning.light,
    width: '99%',
    margin: '3px',
    height: '11vh',
  },
  hideMenu: {
    transform: 'translateY(-200%)',
    transition: 'transform 0.5s ease',
  },
  showMenu: {
    transform: 'translateY(0)',
    transition: 'transform 0.5s ease',
    zIndex: '5',
  },
  active: {
    color: theme.palette.warning.light,
  },
  navlink: {
    color: 'inherit',
    textDecoration: 'inherit',
    background: 'blue',
  },
}))

function SmallScreenMenu({ toogleSmallScreenMenuClass }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const [Rubrics, setRubrics] = React.useState(rubrics)

  const toggleRubric = (index) => {
    const newRubrics = { ...Rubrics }
    newRubrics[index].subdisplay = !Rubrics[index].subdisplay
    setRubrics(newRubrics)
  }

  return (
    <StyledSmallScreenMenu
      className={` ${classes.root} ${toogleSmallScreenMenuClass}`}
    >
      {rubrics.map((element, index) => {
        const { name, link, categories, alias } = element
        const rubricElements = { name: name, alias: alias }
        if (element.alias !== 'home') {
          return (
            <div key={randomkey(987654)}>
              <div className={classes.box}>
                <div className={classes.link}>
                  <NavLink
                    to={{
                      pathname: link,
                      categories: categories,
                      rubric: name,
                      state: {
                        from: pathname,
                        rubric: {
                          name: name,
                          alias: alias,
                        },
                      },
                    }}
                    onClick={() => dispatch(toogleSmallScreenMenu())}
                    className={classes.navlink}
                    activeClassName={classes.active}
                  >
                    <Typography variant="h6">{name}</Typography>
                  </NavLink>
                </div>
                {categories && (
                  <div
                    style={{
                      width: '20%',
                      borderLeft: 'white solid 1px',
                      textAlign: 'center',
                    }}
                  >
                    <span
                      onClick={() => toggleRubric(index)}
                      role="presentation"
                    >
                      <IconButton>
                        <KeyboardArrowDownIcon />
                      </IconButton>
                    </span>
                  </div>
                )}
              </div>
              {Rubrics[index].subdisplay && Rubrics[index].categories && (
                <SmallScreenMenuItem
                  categories={categories}
                  index={index}
                  rubric={rubricElements}
                />
              )}
            </div>
          )
        }
        return null
      })}
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => dispatch(toogleSmallScreenMenu())}
      >
        Fermer cette fenetre
      </Button>
    </StyledSmallScreenMenu>
  )
}

SmallScreenMenu.propTypes = {
  toogleSmallScreenMenuClass: PropTypes.bool.isRequired,
}

export default SmallScreenToogleShow(SmallScreenMenu)
