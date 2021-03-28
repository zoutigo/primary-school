import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const StyledPaperBody = styled(Grid)(({ theme, bgcolor }) => ({
  minWidth: '100%',
  padding: '1rem !important',
}))

function PaperBody({ text }) {
  const textcontent = ReactHtmlParser(text) || "il n'y a pas plus de détails"
  return (
    <StyledPaperBody item container id="paper-body">
      {textcontent}
    </StyledPaperBody>
  )
}

export default PaperBody
