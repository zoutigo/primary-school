import { Grid } from '@material-ui/core'
import React from 'react'
import Login from './credentials/Login'
import Register from './credentials/Register'
import Account from './personal/Account'
import { useSelector } from 'react-redux'
function Private() {
  const isLogged = useSelector((state) => state.user.isLogged)
  return (
    <Grid container>
      {!isLogged ? (
        <Grid item container>
          <Grid item sm={12} md={6}>
            {' '}
            <Login />{' '}
          </Grid>
          <Grid item item sm={12} md={6}>
            {' '}
            <Register />{' '}
          </Grid>
        </Grid>
      ) : (
        <Grid item container>
          <Account />
        </Grid>
      )}
    </Grid>
  )
}

export default Private
