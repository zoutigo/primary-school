import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { apiFetchPaper } from '../../../../../../utils/api'
import ArticleContainer from './ArticleContainer'
const useStyles = makeStyles(() => ({
  hide: {
    display: 'none',
  },
  show: {
    '& :last-child': {
      display: 'block',
    },
  },
}))

function ArticlesContent() {
  const classes = useStyles()
  const paperType = 'article'
  const queryKey = ['papers', paperType]
  const param = ''

  const { isLoading, isError, data, error, isSuccess } = useQuery(
    queryKey,
    () => apiFetchPaper(param)
  )

  useEffect(() => {
    const articles = document.querySelectorAll('[id=article-container]')
    const openArticle = (e) => {
      e.target.classList.add(classes.show)
      for (let i = 0; i < articles.length; i++) {
        if (articles[i] !== e.target) {
          articles[i].classList.remove(classes.show)
        }
      }
    }
    if (data) {
      articles[0].classList.add(classes.show)

      for (let i = 0; i < articles.length; i++) {
        articles[i].addEventListener('click', openArticle)
      }
    }
    return () => {
      if (data) {
        for (let i = 0; i < articles.length; i++) {
          articles[0].classList.add(classes.show)

          articles[i].removeEventListener('click', openArticle)
        }
      }
    }
  }, [isSuccess])

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!Array.isArray(data)) {
    return null
  }
  return (
    <Grid container className={'title'}>
      {data &&
        data.map((item, i) => {
          return <ArticleContainer {...item} key={i} />
        })}
    </Grid>
  )
}

export default ArticlesContent
