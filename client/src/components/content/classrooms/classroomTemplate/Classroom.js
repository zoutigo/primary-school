import React from 'react'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'
import ClassroomInfos from './ClassroomInfos'
import ClassroomButtons from './ClassroomButtons'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100vh',

    textAlign: 'center',
  },

  imgContainer: {
    borderRadius: '5px',

    '& img': {
      width: '40vw',
      height: '60vh',
    },
    '& h4': {
      textAlign: 'left',
      margin: '0px 12%',
    },
  },
}))

function Classroom() {
  const classes = useStyles()
  const { designation, pathname } = useLocation()

  const image = require(`../../../../images/rubrics${pathname}/secondary.jpg`)

  return (
    <Grid container className={classes.root}>
      <Grid item container justify="space-around">
        <Grid item sm={12} md={8} lg={9} className={classes.imgContainer}>
          <img src={image} alt={designation} />
          <Typography variant="h4">CM2</Typography>
          <ClassroomButtons />
        </Grid>
        <Grid item sm={12} md={4} lg={3}>
          <ClassroomInfos />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Classroom
