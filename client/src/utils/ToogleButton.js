import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '3em',
  },
}))

function ToogleButton(props) {
  const classes = useStyles()
  const { text } = props
  return (
    <Button variant="contained" fullWidth className={classes.root}>
      {text}
    </Button>
  )
}

export default ToogleButton
