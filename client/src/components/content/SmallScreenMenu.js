import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

import { NavLink, useLocation } from 'react-router-dom'
import { Button, Typography, IconButton } from '@material-ui/core'

import SmallScreenMenuItem from './SmallScreenMenuItem'
import rubrics from '../../utils/rubrics'

import {
  openSubMenu,
  toogleSmallScreenMenu,
  openCategory,
} from '../../redux/settings/settingsActions'
import SmallScreenToogleShow from './HighOrderComponents/SmallScreenToogleShow'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: '100vw',
    zIndex: 2,
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

function SmallScreenMenu(props) {
  const { toogleSmallScreenMenuClass } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const [Rubrics, setRubrics] = React.useState(rubrics)

  const toggleRubric = (index) => {
    let newRubrics = { ...Rubrics }
    newRubrics[index].subdisplay = !Rubrics[index].subdisplay
    setRubrics(newRubrics)
  }

  return (
    <div className={`${classes.root} ${toogleSmallScreenMenuClass}`}>
      {rubrics.map((element, index) => {
        const { name, link, categories } = element

        if (element.alias !== 'home') {
          return (
            <div key={index}>
              <div className={classes.box}>
                <div className={classes.link}>
                  <NavLink
                    to={{
                      pathname: link,
                      categories: categories,
                      rubric: name,
                      state: {
                        from: pathname,
                      },
                    }}
                    onClick={() => dispatch(toogleSmallScreenMenu())}
                    className={classes.navlink}
                    activeClassName={classes.active}
                  >
                    <Typography variant="h6"> {name} </Typography>
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
                    <span onClick={() => toggleRubric(index)}>
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
                  rubric={element.name}
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
    </div>
  )
}

export default SmallScreenToogleShow(SmallScreenMenu)
