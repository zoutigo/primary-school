import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

import image from '../../../images/rubrics/home/landing/land6.JPG'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    minHeight: '99vh',
    backgroundSize: '2100px',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '-8vh',
    backgroundPosition: 'top  , right',
    background: `linear-gradient(to top, transparent 80%, ${theme.palette.primary.main}),
        url(${image})`,
    position: 'relative',
    '& div': {
      position: 'absolute',
      left: '5vw',
    },
    '& div:first-child': {
      bottom: '48vh',
      color: 'white',
      fontSize: '7em',
      fontWeight: 'bold',
      '& span': {
        fontSize: '40px',
        color: theme.palette.info.light,
      },
    },
    '& div:nth-child(2)': {
      bottom: '30vh',
      fontSize: '5em',
      color: 'white',
      fontWeight: 'bold',
      letterSpacing: '1px',
    },
    '& div:last-child': {
      bottom: '11vh',
      fontSize: '2em',
      color: theme.palette.info.light,
      letterSpacing: '1px',
      fontWeight: 'bold',
    },
  },

  cremieu: {
    position: 'absolute',
    bottom: '11vh',
    left: '45vw',
    color: 'white',
    letterSpacing: '2px',
  },
}))

function Landing() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.welcome}>
        ECOLE ST AUGUSTIN <span>Crémieu</span>
      </div>
      <div> Etablissement Privé Catholique </div>
      <div> Programmes du ministère de l'éducation nationale</div>
    </div>
  )
}

export default Landing
