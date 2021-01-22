import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import image from '../../../images/rubrics/home/landing/land6.JPG'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    minHeight: '93vh',
    backgroundSize: '2100px',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '-8vh',
    backgroundPosition: 'top  , right',
    background: `linear-gradient(to top, transparent 80%, ${theme.palette.primary.main}),
        url(${image})`,
    position: 'relative',
  },
  banner: {
    position: 'absolute',
    bottom: '0vh',
    left: '4vw',
    height: '15vh',
    paddingLeft: '2vw !important',
    paddingRight: '2vw !important',
    color: theme.palette.secondary.main,
    background: 'rgba(255, 239, 211, 0.3)',
  },
}))

function Landing() {
  const classes = useStyles()
  const Scroll = useSelector((state) => state.settings.Scroll)

  const Banner = () => {
    return (
      <Paper className={classes.banner} elevation={3}>
        <Typography variant="h1">ECOLE SAINT AUGUSTIN</Typography>
        <Typography variant="h3">
          Etablissement Privé Catholique, Crémieu{' '}
        </Typography>
      </Paper>
    )
  }
  return <div className={classes.root}>{!Scroll && <Banner />}</div>
}

export default Landing
