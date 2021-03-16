import React from 'react'
import { Grid, styled } from '@material-ui/core'
import Contact from './Contact'
import Timing from './Timing'
import { apiFecthTeam } from '../../utils/api'
import { usePrefetch } from '../../utils/hooks'
import Partners from './Partners'
import FooterLogo from './FooterLogo'
import Copyrights from './Copyrights'
import Suggestions from './Suggestions'

const StyledFooterInfos = styled(Grid)(({ theme }) => ({
  background: theme.palette.secondary.dark,
  minHeight: '5vh',
  maxHeight: '23vh',
  minWwidth: '100vw',
  overflow: 'hidden',
  padding: '2rem 4rem !important',
  color: 'white',
}))

function Footer() {
  usePrefetch('team', apiFecthTeam)

  return (
    <Grid container>
      <StyledFooterInfos item container>
        <Grid item sm={12} md={2}>
          {' '}
          <Contact />{' '}
        </Grid>
        <Grid item sm={12} md={2}>
          {' '}
          <Timing />{' '}
        </Grid>
        <Grid item sm={12} md={3}>
          {' '}
          <Partners />
        </Grid>
        <Grid item sm={12} md={3}>
          {' '}
          <Suggestions />
        </Grid>
        <Grid item sm={12} md={2}>
          {' '}
          <FooterLogo />
        </Grid>
      </StyledFooterInfos>
      <Grid item container>
        <Copyrights />
      </Grid>
    </Grid>
  )
}

export default Footer
