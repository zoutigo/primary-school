import { Box, Collapse, Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import PaperBody from './PaperBody'
import PaperFooter from './PaperFooter'
import PaperHeader from './PaperHeader'

const StyledGridItem = styled(Grid)(({ theme, bgcolor }) => ({
  padding: '0.3rem 0.1rem !important',
  '& >div': {
    boxSizing: 'border-box',
    minWidth: '100%',
  },
}))

function PaperContainer({ paper, item, index, openIndex, setOpenIndex }) {
  const { text, ...rest } = item

  return (
    <StyledGridItem item container id="paper-container">
      <Box boxShadow={3}>
        <PaperHeader
          {...rest}
          paper={paper}
          setOpenIndex={setOpenIndex}
          openIndex={openIndex}
          index={index}
        />
        <Grid item container>
          <Collapse
            in={openIndex[index] === 1}
            timeout="auto"
            unmountOnExit
            style={{ minWidth: '100%' }}
          >
            <Grid container>
              <PaperBody text={text} />
              <PaperFooter paper={paper} item={item} />
            </Grid>
          </Collapse>
        </Grid>
      </Box>
    </StyledGridItem>
  )
}

export default PaperContainer
