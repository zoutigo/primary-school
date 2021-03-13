import { Grid, styled, Typography } from '@material-ui/core'
import React from 'react'
import moment from 'moment'

const StyledHeaderArticlecontainer = styled(Grid)(({ theme, bgcolor }) => ({
  padding: '0.1em !important',
  background: 'whitesmoke',
  '& :last-child': {
    display: 'flex !important',
    flexDirection: 'raw',
    justifyContent: 'flex-end',
  },
}))

function ArticleHeader({ date, title, authorId, _id: paperId }) {
  var dateString = moment(date).format('DD/MM/YYYY')
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

export default ArticleHeader
