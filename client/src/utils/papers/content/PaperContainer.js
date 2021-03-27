import { Collapse, Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import PaperBody from './PaperBody'
import PaperFooter from './PaperFooter'
import PaperHeader from './PaperHeader'

const StyledGridItem = styled(Grid)(({ theme, bgcolor }) => ({
  // '& *': {
  //   pointerEvents: 'none',
  // },
}))

function PaperContainer({ paper, item, index, openIndex, setOpenIndex }) {
  const { text, ...rest } = item

  return (
    <StyledGridItem item container id="paper-container">
      <PaperHeader
        {...rest}
        setOpenIndex={setOpenIndex}
        openIndex={openIndex}
        index={index}
      />
      <Grid item container>
        <Collapse in={openIndex[index] === 1} timeout="auto" unmountOnExit>
          <PaperBody text={text} />
          <PaperFooter paper={paper} item={item} />
        </Collapse>
      </Grid>
    </StyledGridItem>
  )
}

export default PaperContainer
