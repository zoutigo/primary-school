import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import { setIsLogged, setTokenValidity } from '../../redux/user/userActions'

import { rubricComponents } from '../../utils/navComponents'
import ErrorPage from './ErrorPage'
import rubrics from '../../utils/rubrics'
import Identification from './private/credentials/identification/Identification'
import randomkey from '../../utils/randomkey'

function Content() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const home = '/'
  const isHome = pathname === home

  const Rubrics = []
  rubrics.forEach((rubric) => {
    const { alias } = rubric
    rubricComponents.forEach((rc) => {
      if (alias === rc[0]) {
        const newRubric = { ...rubric }
        // eslint-disable-next-line prefer-destructuring
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
          category.chapters.map((chapter) => allChapters.push(chapter.route))
        }
      })
    }
  })

  // Update Token validity check
  const token = useSelector((state) => state.user.Token.token)
  const tokenExp = token ? JSON.parse(atob(token.split('.')[1])).exp : null
  React.useEffect(() => {
    if (!tokenExp) {
      dispatch(setTokenValidity(false))
    } else if (Date.now() >= tokenExp * 1000) {
      dispatch(setTokenValidity(false))
      dispatch(setIsLogged())
    } else {
      dispatch(setTokenValidity(true))
    }
  }, [pathname])

  return (
    <Grid container>
      <Grid item md={false} lg={isHome ? false : 1} />
      <Grid item md={12} lg={isHome ? 12 : 10}>
        <Switch>
          {Rubrics.map((element) => (
            <Route key={randomkey(99999999)} {...element.route} />
          ))}

          {allChapters.map((subsubroute) => (
            <Route key={randomkey(677645677764)} {...subsubroute} />
          ))}
          {allCategories.map((subroute) => (
            <Route key={randomkey(98765432432)} {...subroute} />
          ))}

          <Route
            component={Identification}
            path="/private/identification"
            exact
          />
          <Route component={ErrorPage} />
        </Switch>
      </Grid>
      <Grid item md={false} lg={isHome ? false : 1} />
    </Grid>
  )
}

export default Content
