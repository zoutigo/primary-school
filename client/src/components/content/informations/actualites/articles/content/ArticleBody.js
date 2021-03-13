import { Grid, styled } from '@material-ui/core'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const StyledArticleBody = styled(Grid)(({ theme, bgcolor }) => ({
  display: 'none',
}))

function ArticleBody({ text }) {
  return <StyledArticleBody item>{ReactHtmlParser(text)}</StyledArticleBody>
}

export default ArticleBody
