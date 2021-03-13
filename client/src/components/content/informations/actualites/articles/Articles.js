import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import {
  StyledButton,
  StyledGridTabContainer,
} from '../../../../../utils/componentsStyled'
import ArticlesContent from './content/ArticlesContent'
import ArticleForm from './form/ArticleForm'

function Articles() {
  const [articleContent, setArticleContent] = useState(true)
  const [articleForm, setArticleForm] = useState(false)
  const [buttonGroup, setButtonGroup] = useState(true)
  return (
    <StyledGridTabContainer container>
      <Grid item container md={12} lg={12}>
        {articleContent && <ArticlesContent />}
      </Grid>
      <Grid item container>
        {buttonGroup && (
          <StyledButton
            onClick={() => {
              setArticleContent(false)
              setArticleForm(true)
              setButtonGroup(false)
            }}
          >
            Poster un Article
          </StyledButton>
        )}
      </Grid>
      <Grid item container>
        {articleForm && (
          <ArticleForm
            setArticleContent={setArticleContent}
            setArticleForm={setArticleForm}
            setButtonGroup={setButtonGroup}
          />
        )}
      </Grid>
    </StyledGridTabContainer>
  )
}

export default Articles
