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
    display: 'block',
  },
}))

function PapersContent({ paper }) {
  const classes = useStyles()
  const { queryKey, queryParams, fetcher } = paper
  const { isLoading, isError, data, error, isSuccess } = useQuery(
    queryKey,
    () => fetcher(queryParams)
  )

  useEffect(() => {
    const papersheaders = document.querySelectorAll('[id=paper-header]')
    const papersbodies = document.querySelectorAll('[id=paper-body]')
    const papersfooters = document.querySelectorAll('[id=paper-footer]')
    const count = papersheaders.length

    const openPaper = (j) => {
      papersbodies[j].classList.add(classes.show)
      papersfooters[j].classList.add(classes.show)
      for (let i = 0; i < count; i++) {
        if (j !== i) {
          papersbodies[i].classList.remove(classes.show)
          papersfooters[i].classList.remove(classes.show)
        }
      }
    }
    if (data && count > 0) {
      papersbodies[0].classList.add(classes.show)
      papersfooters[0].classList.add(classes.show)

      for (let i = 0; i < count; i++) {
        papersheaders[i].addEventListener('click', () => openPaper(i))
      }
    }
    return () => {
      // if (data & (count > 0)) {
      //   for (let i = 0; i < count; i++) {
      //     papersbodies[0].classList.remove(classes.show)
      //     papersfooters[0].classList.remove(classes.show)
      //     papersheaders[i].removeEventListener('click', openPaper)
      //   }
      // }
    }
  }, [])

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
          return <PaperContainer paper={paper} item={item} key={i} />
        })}
    </Grid>
  )
}

export default PapersContent
