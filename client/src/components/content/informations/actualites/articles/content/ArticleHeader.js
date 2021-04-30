import { Grid, styled, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const StyledHeaderArticlecontainer = styled(Grid)(() => ({
  padding: '0.1em !important',
  background: 'whitesmoke',
  '& :last-child': {
    display: 'flex !important',
    flexDirection: 'raw',
    justifyContent: 'flex-end',
  },
}))

function ArticleHeader({ date, title, authorId }) {
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

ArticleHeader.propTypes = {
  date: PropTypes.number,
  title: PropTypes.string,
  authorId: PropTypes.string,
}

export default ArticleHeader
