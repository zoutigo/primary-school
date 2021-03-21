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
  background: theme.palette.secondary.main,
  minHeight: '5vh',
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
        <Grid item container xs={12} sm={6} md={4} justify="center">
          {' '}
          <Contact />{' '}
        </Grid>{' '}
        <Grid item xs={12} sm={6} md={4} container justify="center">
          {' '}
          <Suggestions />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
          {' '}
          <Partners />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
          {' '}
          <Timing />{' '}
        </Grid>
        <Grid item xs={12} sm={6} md={4}></Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
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
