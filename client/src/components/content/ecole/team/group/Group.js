import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Department from '../department/Department'
const useStyles = makeStyles((theme) => ({
  root: {},
}))

function Group({ department, members }) {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} data-testid="team-group">
      <Grid item container>
        {' '}
        <Department department={department} />{' '}
      </Grid>
      <Grid item container>
        {members &&
          members.map((member, index) => {
            return <Grid item {...member} key={index} />
          })}
      </Grid>
    </Grid>
  )
}

export default Group
