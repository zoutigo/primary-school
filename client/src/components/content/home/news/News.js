import { Grid, styled, Typography } from '@material-ui/core'
import React from 'react'
import NewsAgenda from './NewsAgenda'
import NewsDocs from './NewsDocs'
import NewsInfos from './NewsInfos'

const StyledNewsContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  paddingTop: '2rem !important',
  paddingBottom: '2rem !important',
}))

const StyledMessage = styled(Typography)(({ theme }) => ({
  fontFamily: "'Swanky and Moo Moo', cursive;",

  fontSize: '5em',
  color: theme.palette.secondary.main,
}))

function News() {
  const message = "Restez connectés à l'actu de l'école ."
  return (
    <StyledNewsContainer container>
      <Grid item container xs={12} xl={12} justify="center">
        <StyledMessage component="div">{message} </StyledMessage>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} container justify="center">
        <NewsDocs />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} container justify="center">
        <NewsInfos />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} container justify="center">
        <NewsAgenda />
      </Grid>
    </StyledNewsContainer>
  )
}

export default News
