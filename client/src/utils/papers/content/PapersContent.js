import { Grid } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
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
    return (
      <span>
        Error:
        {error.message}
      </span>
    )
  }

  if (!Array.isArray(data)) {
    return null
  }

  return (
    <Grid container className="title">
      {data &&
        data.map((object, i) => (
          <PaperContainer
            paper={paper}
            item={object}
            index={i}
            key={object._id}
            {...rest}
          />
        ))}
    </Grid>
  )
}

PapersContent.propTypes = {
  paper: PropTypes.shape({
    queryKey: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ alias: PropTypes.string }),
      ])
    ).isRequired,
    queryParams: PropTypes.string.isRequired,
    fetcher: PropTypes.func.isRequired,
  }).isRequired,
}

export default PapersContent
