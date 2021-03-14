import { Box, styled, Typography } from '@material-ui/core'
import React from 'react'

const StyledAsideSubTitle = styled(Box)(({ theme }) => ({
  textTransform: 'capitalize',
}))

function AsideSubTitle({ subtitle }) {
  return (
    <StyledAsideSubTitle>
      <Typography variant="h6">{subtitle}</Typography>
    </StyledAsideSubTitle>
  )
}

export default AsideSubTitle
