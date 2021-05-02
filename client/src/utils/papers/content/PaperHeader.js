import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styled } from '@material-ui/styles'
import { Box, Grid, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { setCurrentPaperItem } from '../../../redux'

const StyledPaperHeader = styled(Grid)(({ theme, bgcolor }) => ({
  padding: '0px 1rem !important',
  background: 'whitesmoke',
  cursor: 'pointer',
}))

const StyledEventsDetails = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}))

function PaperHeader({
  date,
  place,
  title,
  authorId,
  _id: paperId,
  index,
  paper,
  item,
  entity,
}) {
  const dispatch = useDispatch()
  const { def } = paper
  const id = `paper-header-${index}`

  const { month, type } = item

  const dateString = moment(date).format('DD/MM/YYYY')

  const handleClick = () => {
    dispatch(setCurrentPaperItem({ index: index, datas: item }))
  }

  return (
    <StyledPaperHeader container id={id} onClick={handleClick}>
      <Grid item container>
        <Typography variant="body1">{title}</Typography>
      </Grid>
      {def === 'articles' && (
        <Grid item container>
          <Grid item>
            Publié le:
            {dateString}
          </Grid>
          <Grid item>
            Par:
            {authorId}
          </Grid>
        </Grid>
      )}
      {def === 'activites' && (
        <Grid item container>
          <Grid item xs={6}>
            {' '}
            {dateString}
          </Grid>
          <Grid item xs={6} container justify="flex-end">
            {entity}
          </Grid>
        </Grid>
      )}
      {def === 'file' && (
        <Grid item container>
          <Grid item>
            <Typography variant="body1">
              {type}-{month}
            </Typography>
          </Grid>
        </Grid>
      )}
      {def === 'events' && (
        <StyledEventsDetails item container>
          <Box>
            <Typography variant="caption">
              Date:
              {dateString}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption">{place}</Typography>
          </Box>
        </StyledEventsDetails>
      )}
    </StyledPaperHeader>
  )
}

PaperHeader.defaultProps = null
PaperHeader.propTypes = {
  date: PropTypes.number,
  place: PropTypes.string,
  title: PropTypes.string,
  authorId: PropTypes.string,
  _id: PropTypes.string,
  index: PropTypes.number,
  item: PropTypes.shape({
    type: PropTypes.string,
    month: PropTypes.string,
  }),
  entity: PropTypes.string,
  paper: PropTypes.shape({
    queryKey: PropTypes.arrayOf(PropTypes.String),
    queryParams: PropTypes.string,
    def: PropTypes.string,
    fetcher: PropTypes.func,
    poster: PropTypes.func,
    entity: PropTypes.string,
    type: PropTypes.string,
  }),
}

export default PaperHeader
