import { Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.info.light,
    minWidth: '100%',
    minHeight: '50vh',
  },
}))

function Introduction() {
  const classes = useStyles()
  return <div className={classes.root}></div>
}

export default Introduction
