import React from 'react'
import moment from 'moment'
import { styled } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'

const StyledPaperHeader = styled(Grid)(({ theme, bgcolor }) => ({
  padding: '0.1em !important',
  background: 'whitesmoke',
  pointerEvents: 'auto !important',
  border: 'solid 1px green',
  '& :last-child': {
    display: 'flex !important',
    flexDirection: 'raw',
    justifyContent: 'flex-end',
  },
}))

function PaperHeader({ date, title, authorId, _id: paperId }) {
  const dateString = moment(date).format('DD/MM/YYYY')
  return (
    <StyledPaperHeader item container id="paper-header">
      <Grid item container>
        <Typography variant="body1">{title}</Typography>
      </Grid>
      <Grid item container>
        <Grid item>Publié le: {dateString}</Grid>
        <Grid item>Par: {authorId}</Grid>
      </Grid>
    </StyledPaperHeader>
  )
}

export default PaperHeader
