import { styled, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { StyledHomeSection } from '../../../utils/componentsStyled'
import Title from '../../others.js/Title'

const useStyles = makeStyles((theme) => ({
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

const StyledIntroductionContainer = styled(StyledHomeSection)(({ theme }) => ({
  background: theme.palette.secondary.main,
  paddingTop: '6rem ! important',
  '& >div:last-child': {
    textAlign: 'right',
    color: theme.palette.primary.main,
  },
}))

function Introduction() {
  const classes = useStyles()
  const theme = useTheme()
  const firstPara = `
  L'école St Augustin, école catholique sous contrat d'association
  avec l'état, se situe au coeur de Crémieu, cité médiévale iséroise,
  à une cinquantaine de kilomètres au sud-est de Lyon.
  `
  const secondPara = `
  Toute l'équipe pédagogique a à coeur un encadrement et un
  enseignement prenant en compte chaque enfant : ateliers,
  décloisonnements, différenciations (aides pédagogiques, bilans
  pédagogiques, conseils, contrats, groupes de travail, soutien,
  partenariat avec les parents ...).`

  const thirdPara = `
  Je vous invite à découvrir les 8 classes de l'établissement (3 classes de maternelle et 5 classes de primaire) avec ce que vivent
  ses 218 élèves, son équipe éducative, comprendre sa politique et son
  organisation avec ses projets, son OGEC, son APEL...`
  return (
    <StyledIntroductionContainer>
      <div className={classes.text}>
        <Title
          title={"L'Ecole Saint Augustin vous souhaite la bienvenue !"}
          color={theme.palette.primary.main}
        />

        <div>
          <Typography variant="body1">{firstPara}</Typography>
          <Typography variant="body1">{secondPara}</Typography>
          <Typography variant="body1">{thirdPara}</Typography>
        </div>
      </div>
      <div>
        <Typography variant="subtitle1">
          Frédéric CINTAS , le directeur.
        </Typography>
      </div>
    </StyledIntroductionContainer>
  )
}

export default Introduction
