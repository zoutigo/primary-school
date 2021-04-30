import { Grid, styled } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import ArticleBody from './ArticleBody'
import ArticleHeader from './ArticleHeader'

const StyledGridItem = styled(Grid)(() => ({
  '& *': {
    pointerEvents: 'none',
  },
}))

function ArticleContainer({ text, ...rest }) {
  return (
    <StyledGridItem item container id="article-container">
      <ArticleHeader {...rest} />
      <ArticleBody text={text} />
    </StyledGridItem>
  )
}

ArticleContainer.propTypes = {
  text: PropTypes.string,
}

export default ArticleContainer
