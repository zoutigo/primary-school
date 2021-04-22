import { Box, makeStyles, styled } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
  frame: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
  },
}))

const StyledFrameWrapper = styled(Box)(() => ({
  width: '100%',
  height: '75vh',
  background: 'green',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: '56.25%',
}))

function PaperPdfFrame({ url }) {
  const classes = useStyles()
  return (
    <StyledFrameWrapper>
      <embed
        width="100%"
        height="100%"
        src={url}
        allowfullscreen="allowfullscreen"
        gesture="media"
        allow="encrypted-media"
        // style={{
        //   position: 'absolute',
        //   top: 0,
        //   left: 0,
        //   width: '100%',
        //   height: '100%',
        //   border: 0,
        // }}
      ></embed>
    </StyledFrameWrapper>
  )
}

export default PaperPdfFrame
