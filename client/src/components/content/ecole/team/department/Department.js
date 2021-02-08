import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

function Department({ department }) {
  const classes = useStyles()
  return (
    <div className={classes.root} data-testid="team-department">
      <Typography variant="h3">{department}</Typography>
      <div></div>
    </div>
  )
}

export default Department
