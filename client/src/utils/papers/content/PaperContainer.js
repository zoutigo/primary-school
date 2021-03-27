import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'
import PaperBody from './PaperBody'
import PaperFooter from './PaperFooter'
import PaperHeader from './PaperHeader'

const StyledGridItem = styled(Grid)(({ theme, bgcolor }) => ({
  // '& *': {
  //   pointerEvents: 'none',
  // },
}))

function PaperContainer({ paper, item }) {
  const { text, ...rest } = item
  return (
    <StyledGridItem item container id="paper-container">
      <PaperHeader {...rest} />
      <PaperBody text={text} />
      <PaperFooter paper={paper} item={item} />
    </StyledGridItem>
  )
}

export default PaperContainer
