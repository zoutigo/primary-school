import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/footer/Footer'
import HeadModules from './components/content/HeadModules'

import SmallScreenMenu from './components/content/SmallScreenMenu'
import { useScroll } from './utils/hooks'
import HelmetMetaData from './components/others.js/HelmetMetaData'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
      retryDelay: 500,
    },
  },
})

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
  useScroll()

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetMetaData />
      <Grid container direction="column" className={classes.root}>
        <Grid item container>
          <Header />
        </Grid>
        <Grid item container>
          <HeadModules />
          <SmallScreenMenu />
          <Content />
        </Grid>
        <Grid item container>
          <Footer />
        </Grid>
      </Grid>
    </QueryClientProvider>
  )
}
export default App
