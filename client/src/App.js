import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { styled } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/footer/Footer'

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
const StyledApp = styled(Grid)(() => ({
  maxWidth: '100vw',
  overflow: 'hidden',
  '& *': {
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
}))

function App() {
  useScroll()

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetMetaData />
      <StyledApp container direction="column">
        <Grid item container style={{ position: 'fixed', top: 0, zIndex: 10 }}>
          <Header />
        </Grid>
        <Grid item container>
          <SmallScreenMenu />
        </Grid>

        <Content />

        <Grid item container>
          <Footer />
        </Grid>
      </StyledApp>
    </QueryClientProvider>
  )
}
export default App
