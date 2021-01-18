import React from 'react'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/footer/Footer'
import HeadModules from './components/content/HeadModules'

import SmallScreenMenu from './components/content/SmallScreenMenu'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
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

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
