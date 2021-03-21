import React from 'react'
import { styled } from '@material-ui/styles'
import { H3Title } from '../../../utils/components'
import { Grid } from '@material-ui/core'

const StyledFooterCard = styled(Grid)(({ theme }) => ({
  background: 'transparent',
  paddingBottom: '1.2rem !important',
  width: '380px',
  [theme.breakpoints.down('md')]: {
    paddingBottom: '0.2rem !important',
  },
}))
const StyledFooterCardHead = styled(Grid)(() => ({
  background: 'transparent',
}))
const StyledFooterCardBody = styled(Grid)(() => ({
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
}))

function FooterCard({ title, items }) {
  const FooterCardHead = ({ title }) => (
    <StyledFooterCardHead item>{H3Title(title)}</StyledFooterCardHead>
  )
  const FooterCardBody = ({ items }) => (
    <StyledFooterCardBody item container>
      {items.map((item, i) => (
        <Grid item key={i}>
          {item}{' '}
        </Grid>
      ))}
    </StyledFooterCardBody>
  )

  return (
    <StyledFooterCard item container>
      <FooterCardHead title={title} />
      <FooterCardBody items={items} />
    </StyledFooterCard>
  )
}

export default FooterCard
