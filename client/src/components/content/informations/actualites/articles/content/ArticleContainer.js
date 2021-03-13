import { Grid, styled } from '@material-ui/core'
import React from 'react'
import ArticleBody from './ArticleBody'
import ArticleHeader from './ArticleHeader'

const StyledGridItem = styled(Grid)(({ theme, bgcolor }) => ({
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

export default ArticleContainer
