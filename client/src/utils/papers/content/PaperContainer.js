import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'
import PaperBody from './PaperBody'
import PaperHeader from './PaperHeader'

const StyledGridItem = styled(Grid)(({ theme, bgcolor }) => ({
  '& *': {
    pointerEvents: 'none',
  },
}))

function PaperContainer({ text, ...rest }) {
  return (
    <StyledGridItem item container id="paper-container">
      <PaperHeader {...rest} />
      <PaperBody text={text} />
    </StyledGridItem>
  )
}

export default PaperContainer
