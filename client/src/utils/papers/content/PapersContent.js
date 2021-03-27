import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import PaperContainer from './PaperContainer'

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

function PapersContent({ paper: { queryKey, queryParams, fetcher } }) {
  const classes = useStyles()
  const { isLoading, isError, data, error, isSuccess } = useQuery(
    queryKey,
    () => fetcher(queryParams)
  )

  useEffect(() => {
    const articles = document.querySelectorAll('[id=paper-container]')
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

  console.log('datalengt', data.length)

  return (
    <Grid container className={'title'}>
      {data &&
        data.map((item, i) => {
          return <PaperContainer {...item} key={i} />
        })}
    </Grid>
  )
}

export default PapersContent
