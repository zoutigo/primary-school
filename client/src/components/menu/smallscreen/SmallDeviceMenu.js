import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'
import SmallScreenMenu from '../../content/SmallScreenMenu'

const StyledContainer = styled(Grid)(() => ({
  position: 'relative',
}))

function SmallDeviceMenu() {
  return (
    <StyledContainer item container>
      <SmallScreenMenu />
    </StyledContainer>
  )
}

export default SmallDeviceMenu
