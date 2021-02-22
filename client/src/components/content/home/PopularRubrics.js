import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import rubrics from '../../../utils/rubrics'
import { Button } from '@material-ui/core'
import LocalMallIcon from '@material-ui/icons/LocalMall'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import HelpIcon from '@material-ui/icons/Help'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10vh 0 !important',
  },
  card: {
    textAlign: 'center',
    padding: '0 5vw !important',
    '& >h2': {
      color: theme.palette.secondary.main,
      marginTop: '0.8rem',
    },
    '& >button': {
      marginTop: '1.5rem',
      '& :hover': {
        background: theme.palette.primary.light,
      },
    },
  },
  icon: {
    color: theme.palette.primary.main,
    width: '5em',
    height: '5em',
  },
}))

const populars = ['classes', 'vie-scolaire', 'cantine']
const Populars = []

function PopularRubrics() {
  const classes = useStyles()
  const history = useHistory()

  const Populars = [
    [
      'Classes',
      '/classes',
      'Accédez aux différentes classes et informations les concernant, de la Petite Section au CM2',
      <LocalMallIcon className={classes.icon} />,
    ],
    [
      'Ecole',
      '/ecole',
      'Venez découvrir l’histoire, les valeurs de notre établissement et les avis des parents',
      <AccountBalanceIcon className={classes.icon} />,
    ],
    [
      'Cantine',
      '/vie-scolaire/cantine',
      'Toutes les informations concernant la cantine, les menus et nos prestataires restauration',
      <RestaurantIcon className={classes.icon} />,
    ],
    [
      'Contacts',
      '/informations/contacts',
      'Retrouvez ici nos coordonnées, plan d’accès et formulaire de contact',
      <HelpIcon className={classes.icon} />,
    ],
  ]

  const PopularItem = (props) => {
    const { item } = props
    const [title, link, text, icon] = item

    return (
      <Grid item className={classes.card} sm={12} md={6} lg={3}>
        <div>{icon}</div>

        <Typography variant="h2"> {title}</Typography>

        <Typography variant="subtitle1">{text}</Typography>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            handleClick(link)
          }}
        >
          Allons y
        </Button>
      </Grid>
    )
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
    <Grid container className={classes.root}>
      {Populars.map((Popular, index) => {
        return <PopularItem item={Popular} key={index} />
      })}
    </Grid>
  )
}

export default PopularRubrics
