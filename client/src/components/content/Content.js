import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { useLocation } from 'react-router-dom'

import { Switch, Route } from 'react-router-dom'

import ErrorPage from './ErrorPage'
import SmallScreenToogleShow from './HighOrderComponents/SmallScreenToogleShow'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100vw',

    paddingTop: '1em',
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

function Content(props) {
  const { toogleContentClass } = props
  const classes = useStyles()
  const { pathname } = useLocation()
  const home = '/'
  const isHome = pathname === home
  const rootClass = () => (!isHome ? classes.root : null)

  const rubrics = useSelector((state) => state.settings.rubrics)

  const allCategories = []
  const allSubCategories = []

  rubrics.forEach((element) => {
    if (element.categories) {
      element.categories.forEach((el) => {
        if (el.route) {
          allCategories.push(el.route)
        }
        if (el.subcategories) {
          el.subcategories.map((subcategory) => {
            allSubCategories.push(subcategory.route)
          })
        }
      })
    }
  })

  return (
    <div className={`${toogleContentClass} ${rootClass()}`}>
      <div className={`${!isHome && classes.empty}`}></div>
      <div className={classes.content}>
        <Switch>
          {rubrics.map((element, index) => (
            <Route key={index} {...element.route} />
          ))}
          {allCategories.map((subroute, i) => (
            <Route key={i} {...subroute} />
          ))}

          {allSubCategories.map((subsubroute, ind) => (
            <Route key={ind} {...subsubroute} />
          ))}
          <Route component={ErrorPage} />
        </Switch>
      </div>
      <div className={`${!isHome && classes.empty}`}></div>
    </div>
  )
}

export default SmallScreenToogleShow(Content)
