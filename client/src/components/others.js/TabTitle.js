import { styled, Typography } from '@material-ui/core'
import React from 'react'

const StyledTypo = styled(Typography)(() => ({
  margin: '0.2rem 1rem ! important',
}))

function TabTitle({ title }) {
  return <StyledTypo variant="h6">{title}</StyledTypo>
}

export default TabTitle