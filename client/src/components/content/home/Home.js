import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

import Landing from './Landing'
import Introduction from './Introduction'
import Figures from './Figures'

import PopularRubrics from './PopularRubrics'
import News from './news/News'

const useStyles = makeStyles(() => ({
  root: {},
}))

function Home() {
  const classes = useStyles()
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item container>
        <Landing />
      </Grid>
      <Grid item container>
        <Introduction />
      </Grid>
      <Grid item container>
        <PopularRubrics />
      </Grid>
      <Grid item container>
        <Figures />
      </Grid>

      <Grid item container>
        <News />
      </Grid>
      {/* <Grid item container>
        <Illustrations />
      </Grid>
      <Grid item container>
        <ContactForm />
      </Grid> */}
    </Grid>
  )
}

export default Home
