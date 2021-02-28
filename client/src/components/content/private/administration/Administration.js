import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { useRouteMatch } from 'react-router-dom'
import React from 'react'
import { Route, Switch } from 'react-router'
import SitePage from './sitepages/SitePage'
import Classrooms from './classrooms/Classrooms'
import Pages from './pages/Pages'
import Users from './users/Users'
import Datas from './datas/Datas'
import { StyledPrivateAdminMainContainer } from '../../../../utils/forms/styledComponents'
import { useDispatch, useSelector } from 'react-redux'
import PageCreation from './pages/PageCreation'
import PageUpdate from './pages/PageUpdate'
import AdminItem from './AdminItem'
import { setPagesList } from '../../../../redux/admin/adminActions'
import { useQuery } from 'react-query'
import { apiFecthAllPages } from '../../../../utils/api'

function Administration() {
  const dispatch = useDispatch()
  let { url } = useRouteMatch()

  const StyledGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }))

  const adminItems = useSelector((state) => state.admin.adminItems)
  const components = [
    {
      id: 2,
      component: Classrooms,
    },
    {
      id: 3,
      component: Pages,
    },
    {
      id: 0,
      component: Users,
    },
    {
      id: 1,
      component: Datas,
    },
    {
      id: 'page-creation',
      component: PageCreation,
    },
    {
      id: 'page-update',
      component: PageUpdate,
    },
  ]
  const Subitems = []
  for (let i = 0; i < adminItems.length; i++) {
    if (adminItems[i].subitems.length > 0) {
      for (let j = 0; j < adminItems[i].subitems.length; j++) {
        Subitems.push(adminItems[i].subitems[j])
      }
    }
  }
  const SubitemsAndComponents = Subitems.map((item) => {
    let result = {}
    for (let i = 0; i < components.length; i++) {
      if (item.id === components[i].id) {
        result = { ...item }
        result.component = components[i].component
      }
    }
    return result
  })

  const itemsAndComponents = adminItems.map((item) => {
    let result = {}
    for (let i = 0; i < components.length; i++) {
      if (item.id === components[i].id) {
        result = { ...item }
        result.component = components[i].component
      }
    }
    return result
  })

  return (
    <StyledGrid container>
      <Grid
        item
        container
        md={4}
        lg={2}
        display="flex"
        direction="column"
        justify="flex-start"
      >
        <div>
          {itemsAndComponents.map((item, i) => (
            <AdminItem adminItem={item} key={i} />
          ))}
        </div>
      </Grid>
      <StyledPrivateAdminMainContainer item container md={8} lg={10}>
        <Switch>
          {itemsAndComponents.map((item, i) => (
            <Route
              path={`${url}${item.path}`}
              component={item.component}
              exact={true}
              key={i}
            />
          ))}
          {SubitemsAndComponents.map(({ component, path }, i) => (
            <Route
              component={component}
              path={`${url}${path}`}
              exact={true}
              key={i}
            />
          ))}
          {/* <Route
            path={`${url}/administration/pages/creation`}
            component={PageCreation}
          /> */}
        </Switch>
      </StyledPrivateAdminMainContainer>

      <SitePage />
    </StyledGrid>
  )
}

export default Administration
