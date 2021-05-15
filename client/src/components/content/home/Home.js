import React from 'react'
import { Grid } from '@material-ui/core'

import Landing from './Landing'

import Figures from './figures/Figures'

import PopularRubrics from './PopularRubrics'
import News from './news/News'
import Introduction from './introduction/Introduction'

function Home() {
  return (
    <Grid container direction="column">
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
