import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/footer/Footer'
import HeadModules from './components/content/HeadModules'

import SmallScreenMenu from './components/content/SmallScreenMenu'

const useStyles = makeStyles({
  root: {
    maxWidth: '100vw',
    overflow: 'hidden',
    '& *': {
      listStyle: 'none',
      margin: '0',
      padding: '0',
    },
  },
})

function App() {
  const classes = useStyles()

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item container>
        {' '}
        <Header />{' '}
      </Grid>
      <Grid item container>
        <HeadModules />
        <SmallScreenMenu />
        <Content />
      </Grid>
      <Grid item container>
        {' '}
        <Footer />{' '}
      </Grid>
    </Grid>
  )
}

export default App
