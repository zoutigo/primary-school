import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import image from '../../../images/rubrics/home/landing/land6.JPG'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    minHeight: '93vh',
    backgroundSize: '2100px',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '-8vh',
    backgroundPosition: 'bottom, left',
    background: `linear-gradient(to top, transparent 80%, white),
        url(${image}) `,
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      background: 'none',
      backgroundSize: 'cover',
    },
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
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  land: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    minwidth: '100vw',
    minHeight: '50vw',
    marginTop: '9vh !important',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  text: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    color: theme.palette.secondary.main,
    '& h3': {
      margin: '2rem 0.7rem 2rem 0.7rem',
      textAlign: 'justify',
    },
    '& :nth-child(2)': {
      textAlign: 'justify',
      margin: '1rem 0.7rem ',
    },
    '& :nth-child(3)': {
      textAlign: 'justify',
      margin: '1rem 0.7rem ',
    },
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
  return (
    <div className={classes.root}>
      {!Scroll && <Banner />}
      <div className={classes.land}>
        <img src={image} />
      </div>
      <div className={classes.text}>
        <Typography variant="h3">Bienvenue à l'Ecole Saint Augustin</Typography>
        <Typography variant="body2">
          L'école St Augustin, école catholique sous contrat d'association avec
          l'état, se situe au coeur de Crémieu, cité médiévale iséroise, à une
          cinquantaine de kilomètres au sud-est de Lyon.
        </Typography>
        <Typography variant="body2">
          Toute l'équipe pédagogique a à coeur un encadrement et un enseignement
          prenant en compte chaque enfant : ateliers, décloisonnements,
          différenciations (aides pédagogiques, bilans pédagogiques, conseils,
          contrats, groupes de travail, soutien, partenariat avec les parents
          ...).
        </Typography>
      </div>
    </div>
  )
}

export default Landing
