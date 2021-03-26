import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const StyledArticleBody = styled(Grid)(({ theme, bgcolor }) => ({
  display: 'none',
}))

function PaperBody({ text }) {
  return <StyledArticleBody item>{ReactHtmlParser(text)}</StyledArticleBody>
}

export default PaperBody
