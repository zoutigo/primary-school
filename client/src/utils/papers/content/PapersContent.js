import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
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

  const [openIndex, setOpenIndex] = useState(false)
  const { queryKey, queryParams, fetcher } = paper
  const { isLoading, isError, data, error, isSuccess } = useQuery(
    queryKey,
    () => fetcher(queryParams)
  )

  useEffect(() => {
    if (isSuccess && data && data.length > 0) {
      const array = []
      for (let i = 0; i < data.length; i++) {
        if (i == 0) {
          array.push(1)
        } else {
          array.push(0)
        }
      }

      setOpenIndex(array)
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
          return (
            <PaperContainer
              paper={paper}
              item={item}
              index={i}
              key={i}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          )
        })}
    </Grid>
  )
}

export default PapersContent
