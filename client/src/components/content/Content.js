import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import { setIsLogged, setTokenValidity } from '../../redux/user/userActions'

import { rubricComponents } from '../../utils/navComponents'
import ErrorPage from './ErrorPage'
import rubrics from '../../utils/rubrics'
import Identification from './private/credentials/identification/Identification'
import { Grid } from '@material-ui/core'

function Content() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const home = '/'
  const isHome = pathname === home

  const Rubrics = []
  rubrics.forEach((rubric) => {
    let { alias } = rubric
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
      <Grid item md={false} lg={isHome ? false : 1}></Grid>
      <Grid item md={12} lg={isHome ? 12 : 10}>
        <Switch>
          {Rubrics.map((element, index) => (
            <Route key={index} {...element.route} />
          ))}

          {allChapters.map((subsubroute, ind) => (
            <Route key={ind} {...subsubroute} />
          ))}
          {allCategories.map((subroute, i) => (
            <Route key={i} {...subroute} />
          ))}

          <Route
            component={Identification}
            path="/private/identification"
            exact={true}
          />
          <Route component={ErrorPage} />
        </Switch>
      </Grid>
      <Grid item md={false} lg={isHome ? false : 1}></Grid>
    </Grid>
  )
}

export default Content
