import React from 'react'
import PropTypes from 'prop-types'

import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles, styled, useTheme } from '@material-ui/styles'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import LocalMallIcon from '@material-ui/icons/LocalMall'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import HelpIcon from '@material-ui/icons/Help'
import { useHistory } from 'react-router-dom'
import { StyledHomeSection } from '../../../utils/componentsStyled'
import ButtonComponent from '../../others.js/ButtonComponent'

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: 'center',
    padding: '0 5vw !important',
    '& >h2': {
      color: theme.palette.secondary.main,
      marginTop: '0.8rem',
    },
  },
  icon: {
    color: theme.palette.primary.main,
    width: '5em',
    height: '5em',
  },
}))

const StyledTextBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    minHeight: '12vh ',
  },
}))

const StyledPopularItemCard = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  padding: '0 5vw !important',
  [theme.breakpoints.down('md')]: {
    borderTop: `solid 1px ${theme.palette.secondary.main}`,
    paddingBottom: '2rem ! important',
  },
}))

function PopularRubrics() {
  const classes = useStyles()
  const history = useHistory()

  const Populars = [
    [
      'Classes',
      '/classes',
      'Accédez aux différentes classes et informations les concernant, de la Petite Section au CM2',
      <LocalMallIcon className={classes.icon} key="1" />,
    ],
    [
      'Ecole',
      '/ecole',
      'Venez découvrir l’histoire, les valeurs de notre établissement et les avis des parents',
      <AccountBalanceIcon className={classes.icon} key="2" />,
    ],
    [
      'Cantine',
      '/vie-scolaire/cantine',
      'Toutes les informations concernant la cantine, les menus et nos prestataires restauration',
      <RestaurantIcon className={classes.icon} key="3" />,
    ],
    [
      'Contacts',
      '/informations/contacts',
      'Retrouvez ici nos coordonnées, plan d’accès et formulaire de contact',
      <HelpIcon className={classes.icon} key="4" />,
    ],
  ]

  const PopularItem = (props) => {
    const { item } = props
    const [title, link, text, icon] = item
    const theme = useTheme()

    return (
      <StyledPopularItemCard item sm={12} md={6} lg={3}>
        <box>{icon}</box>

        <Typography variant="h2"> {title}</Typography>
        <StyledTextBox>
          <Typography variant="body1">{text}</Typography>
        </StyledTextBox>

        <ButtonComponent
          color={theme.palette.secondary.main}
          background={theme.palette.secondary.light}
          hovercolor={theme.palette.primary.main}
          hoverbackground={theme.palette.secondary.main}
          minwidth={'250px'}
          text={'Allons Y'}
          icon={<ExitToAppIcon />}
          onClick={() => {
            handleClick(link)
          }}
        >
          Allons y
        </ButtonComponent>
      </StyledPopularItemCard>
    )
  }

  PopularItem.propTypes = {
    item: PropTypes.array,
  }

  const handleClick = (link) => {
    history.push({
      pathname: link,
      state: {
        from: '/',
      },
    })
  }

  return (
    <StyledHomeSection container>
      {Populars.map((Popular, index) => {
        return <PopularItem item={Popular} key={index} />
      })}
    </StyledHomeSection>
  )
}

export default PopularRubrics
