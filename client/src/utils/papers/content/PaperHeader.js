import React, { useEffect } from 'react'
import moment from 'moment'
import { styled } from '@material-ui/styles'
import { Box, Grid, Typography } from '@material-ui/core'

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
  setOpenIndex,
  openIndex,
  index,
  paper,
}) {
  const { def } = paper
  const id = `paper-header-${index}`

  const dateString = moment(date).format('DD/MM/YYYY')

  const handleClick = () => {
    const array = []
    for (let i = 0; i < openIndex.length; i++) {
      if (index === i) {
        array.push(1)
      } else {
        array.push(0)
      }
    }
    setOpenIndex(array)
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
