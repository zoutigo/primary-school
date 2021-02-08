import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

function Member({ gender, firstname, lastname, position }) {
  const classes = useStyles()
  return (
    <Grid
      item
      container
      className={classes.root}
      sm={12}
      md={6}
      data-testid="team-member"
    >
      <div>
        <div>{gender}</div>
        <div>{firstname}</div>
        <div>{lastname}</div>
      </div>
      <div>{position}</div>
    </Grid>
  )
}

export default Member
