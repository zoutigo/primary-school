import { Grid, styled, Typography } from '@material-ui/core'
import React from 'react'

const StyledCardItem = styled(Grid)(() => ({
  padding: '1rem !important',
}))

function CardItem({ title, detail }) {
  return (
    <StyledCardItem container>
      <Grid item xs={12}>
        {' '}
        <Typography variant="body1" component="div">
          {' '}
          {title}
        </Typography>{' '}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" component="span">
          {detail}
        </Typography>
      </Grid>
    </StyledCardItem>
  )
}

export default CardItem
