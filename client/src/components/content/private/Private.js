import { Grid } from '@material-ui/core'
import React from 'react'
import Login from './credentials/Login'
import Register from './credentials/Register'
import Account from './personal/Account'
import { useSelector } from 'react-redux'
function Private() {
  const isLogged = useSelector((state) => state.user.isLogged)
  const [previousPage, setPreviousPage] = React.useState()
  return (
    <Grid container>
      {!isLogged ? (
        <Grid item container>
          <Grid item sm={12} md={6}>
            {' '}
            <Login setPreviousPage={setPreviousPage} />{' '}
          </Grid>
          <Grid item item sm={12} md={6}>
            {' '}
            <Register setPreviousPage={setPreviousPage} />{' '}
          </Grid>
        </Grid>
      ) : (
        <Grid item container>
          <Account previousPage={previousPage} />
        </Grid>
      )}
    </Grid>
  )
}

export default Private
