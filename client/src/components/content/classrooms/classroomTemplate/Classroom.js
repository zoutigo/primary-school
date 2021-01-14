import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import ClassroomInfos from './ClassroomInfos'
import Papers from '../../papers/Papers'
import ToogleButton from '../../../../utils/ToogleButton'
import {
  showPapers,
  showClassroom,
} from '../../../../redux/settings/settingsActions'

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
  message: {
    width: '40vw',
    margin: 'auto',
  },
}))

function Classroom() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const displayClassroom = useSelector(
    (state) => state.settings.displayClassroom
  )
  const { designation, pathname } = useLocation()
  console.log('pathname:', pathname)

  // const image = require(`../../../../images/rubrics${pathname}/secondary.jpg`)
  const image = require('../../../../images/rubrics/classes/secondary.jpg')
  const handleToggle = () => {
    dispatch(showClassroom())
    dispatch(showPapers())
    window.scrollTo(0, 0)
  }

  const useDispatchUnmount = (action) => {
    React.useEffect(() => {
      return () => {
        dispatch(action)
      }
    }, [])
  }
  useDispatchUnmount(showClassroom(true))
  useDispatchUnmount(showPapers(false))

  return (
    <Grid container className={classes.root}>
      {displayClassroom && (
        <Grid item container justify="space-around">
          <Grid item sm={12} md={8} lg={9} className={classes.imgContainer}>
            <img src={image} alt={designation} />
          </Grid>
          <Grid item sm={12} md={4} lg={3}>
            <ClassroomInfos />
          </Grid>
        </Grid>
      )}
      {displayClassroom && (
        <Grid item container>
          <Grid item sm={12} md={8} lg={9}>
            <div className={classes.message}>{message}</div>
          </Grid>
          <Grid item sm={12} md={4} lg={3}>
            <div onClick={handleToggle}>
              <ToogleButton text={`Consulter l'actualité `} />
            </div>
          </Grid>
        </Grid>
      )}

      <Grid item container>
        <Papers />
      </Grid>
    </Grid>
  )
}

export default Classroom

const message = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. `
