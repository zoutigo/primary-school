import { Box, Collapse, Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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

function PaperContainer({ paper, item, index }) {
  const { text, ...rest } = item

  const { showPaperItems, currentPaperItem } = useSelector(
    (state) => state.papers
  )

  return (
    <StyledGridItem item container id="paper-container">
      {showPaperItems && (
        <Box boxShadow={3}>
          <PaperHeader {...rest} paper={paper} index={index} item={item} />
          <Grid item container>
            <Collapse
              in={index === currentPaperItem.index}
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
      )}
    </StyledGridItem>
  )
}

export default PaperContainer
