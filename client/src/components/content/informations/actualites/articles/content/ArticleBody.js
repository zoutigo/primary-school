import { Grid, styled } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'

const StyledArticleBody = styled(Grid)(() => ({
  display: 'none',
}))

function ArticleBody({ text }) {
  return <StyledArticleBody item>{ReactHtmlParser(text)}</StyledArticleBody>
}
ArticleBody.propTypes = {
  text: PropTypes.string,
}

export default ArticleBody
