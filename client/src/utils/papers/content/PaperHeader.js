import React from 'react'
import moment from 'moment'
import { styled } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'

const StyledHeaderArticlecontainer = styled(Grid)(({ theme, bgcolor }) => ({
  padding: '0.1em !important',
  background: 'whitesmoke',
  '& :last-child': {
    display: 'flex !important',
    flexDirection: 'raw',
    justifyContent: 'flex-end',
  },
}))

function PaperHeader({ date, title, authorId, _id: paperId }) {
  const dateString = moment(date).format('DD/MM/YYYY')
  return (
    <StyledHeaderArticlecontainer item container id="container">
      <Grid item container>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item container>
        <Grid item>Publié le: {dateString}</Grid>
        <Grid item>Par: {authorId}</Grid>
      </Grid>
    </StyledHeaderArticlecontainer>
  )
}

export default PaperHeader
