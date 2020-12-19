import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    height: '3em',
  },
}))
function TitlePanel(props) {
  const classes = useStyles()
  const { title, background } = props

  return (
    <Box className={`${classes.root} ${background}`}>
      <Typography variant="h4">{title} </Typography>
    </Box>
  )
}

export default TitlePanel
