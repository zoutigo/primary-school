import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  root: {
    '& div': {
      background: 'green',
      width: '100%',
    },
  },
}))
function WelcomeMessage() {
  const classes = useStyles()
  const { state } = useLocation()

  return (
    <Grid
      item
      container
      className={classes.root}
      style={{ marginBottom: '1em' }}
    >
      <Paper elevation="3">
        <Typography variant="h6">Bienvenue</Typography>
        <p>
          Bienvenue sur le site de l'école saint augustin de cremieu. Vous
          pouvez desormais consulter des informations privilégiées
        </p>
      </Paper>
    </Grid>
  )
}

export default WelcomeMessage
