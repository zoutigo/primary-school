import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const StyledPaperBody = styled(Grid)(({ theme, bgcolor }) => ({
  display: 'none',
}))

function PaperBody({ text }) {
  return (
    <StyledPaperBody item id="paper-body">
      {/* {ReactHtmlParser(text)} */}
      HELLO EVERYONE
    </StyledPaperBody>
  )
}

export default PaperBody
