import { Grid } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import { setCurrentPaperItem } from '../../../redux'
import { useDispatchOnMutation } from '../../hooks'
import PaperContainer from './PaperContainer'

function PapersContent({ paper, ...rest }) {
  const { queryKey, queryParams, fetcher } = paper
  const { isLoading, isError, data, error, isSuccess } = useQuery(
    queryKey,
    () => fetcher(queryParams)
  )

  const item = data ? { index: 0, datas: data[0] } : null
  useDispatchOnMutation(isSuccess, setCurrentPaperItem, item)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!Array.isArray(data)) {
    return null
  }
  console.log('data', data)

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
              {...rest}
            />
          )
        })}
    </Grid>
  )
}

export default PapersContent
