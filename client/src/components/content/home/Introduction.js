import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: theme.palette.secondary.main,
    padding: '1em 5vw !important',
    '& >div:last-child': {
      textAlign: 'right',
      color: theme.palette.primary.main,
    },
  },

  text: {
    color: 'white',
    textAlign: 'justify',
    '& h2': {
      margin: '0.3rem 0 ',
      color: theme.palette.primary.main,
    },
    '& div *': {
      margin: '1em 0',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}))

function Introduction() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.text}>
        <Typography variant="h2">
          L'Ecole Saint Augustin vous souhaite la bienvenue !
        </Typography>
        <div>
          <Typography variant="body1">
            L'école St Augustin, école catholique sous contrat d'association
            avec l'état, se situe au coeur de Crémieu, cité médiévale iséroise,
            à une cinquantaine de kilomètres au sud-est de Lyon.
          </Typography>
          <Typography variant="body1">
            Toute l'équipe pédagogique a à coeur un encadrement et un
            enseignement prenant en compte chaque enfant : ateliers,
            décloisonnements, différenciations (aides pédagogiques, bilans
            pédagogiques, conseils, contrats, groupes de travail, soutien,
            partenariat avec les parents ...).
          </Typography>
          <Typography variant="body1">
            ​Je vous invite à découvrir les 8 classes de l'établissement (3
            classes de maternelle et 5 classes de primaire) avec ce que vivent
            ses 218 élèves, son équipe éducative, comprendre sa politique et son
            organisation avec ses projets, son OGEC, son APEL...
          </Typography>
        </div>
      </div>
      <div>
        <Typography variant="subtitle1">
          Frédéric CINTAS , le directeur.
        </Typography>
      </div>
    </div>
  )
}

export default Introduction
