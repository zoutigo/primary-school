import { Typography } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'

const StyledTypo = styled(Typography)(({ color }) => ({
  color: color,
}))

function Title({ title, color }) {
  return (
    <StyledTypo variant="h3" color={color}>
      {' '}
      {title}{' '}
    </StyledTypo>
  )
}

export default Title
