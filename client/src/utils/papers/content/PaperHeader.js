import React, { useEffect } from 'react'
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
}) {
  const dispatch = useDispatch()
  const { def } = paper
  const id = `paper-header-${index}`

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
          <Grid item>Publié le: {dateString}</Grid>
          <Grid item>Par: {authorId}</Grid>
        </Grid>
      )}
      {def === 'events' && (
        <StyledEventsDetails item container>
          <Box>
            <Typography variant="caption">Date: {dateString}</Typography>
          </Box>
          <Box>
            <Typography variant="caption">{place}</Typography>
          </Box>
        </StyledEventsDetails>
      )}
    </StyledPaperHeader>
  )
}

export default PaperHeader
