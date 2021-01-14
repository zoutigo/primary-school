import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useLocation } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { Switch, Route } from 'react-router-dom'
import { rubricComponents } from '../../utils/navComponents'
import ErrorPage from './ErrorPage'
import SmallScreenToogleShow from './HighOrderComponents/SmallScreenToogleShow'
import rubrics from '../../utils/rubrics'
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100vw',

    paddingTop: '1em',
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
  empty: {
    [theme.breakpoints.up('lg')]: {
      minWidth: '15%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      minWidth: '7%',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '1%',
    },
  },
  content: {
    [theme.breakpoints.up('lg')]: {
      minWidth: '70%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      minWidth: '86%',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '98%',
    },
  },
}))

function Content() {
  const theme = useTheme()
  const classes = useStyles()
  const { pathname } = useLocation()

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const smallScreenMenuIsOpened = useSelector(
    (state) => state.settings.smallScreenMenuIsOpened
  )

  const home = '/'
  const isHome = pathname === home
  const rootClass = () => (!isHome ? classes.root : null)

  const Rubrics = []
  rubrics.forEach((rubric) => {
    let { alias, route } = rubric
    rubricComponents.forEach((rc) => {
      if (alias === rc[0]) {
        let newRubric = { ...rubric }
        newRubric.route.component = rc[1]
        Rubrics.push(newRubric)
      }
    })
  })

  const allCategories = []
  const allChapters = []

  rubrics.forEach((rubric) => {
    if (rubric.categories) {
      rubric.categories.forEach((category) => {
        if (category.route) {
          allCategories.push(category.route)
        }
        if (category.chapters) {
          category.chapters.map((chapter) => {
            allChapters.push(chapter.route)
          })
        }
      })
    }
  })

  return (
    <div
      className={`${
        isSmallScreen && smallScreenMenuIsOpened ? classes.show : classes.show
      } ${rootClass()}`}
    >
      <div className={`${!isHome && classes.empty}`}></div>
      <div className={classes.content}>
        <Switch>
          {Rubrics.map((element, index) => (
            <Route key={index} {...element.route} />
          ))}

          {allCategories.map((subroute, i) => (
            <Route key={i} {...subroute} />
          ))}

          {allChapters.map((subsubroute, ind) => (
            <Route key={ind} {...subsubroute} />
          ))}
          <Route component={ErrorPage} />
        </Switch>
      </div>
      <div className={`${!isHome && classes.empty}`}></div>
    </div>
  )
}

export default Content
