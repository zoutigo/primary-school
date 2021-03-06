import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import image from '../../../images/rubrics/home/landing/land7.JPG'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    minHeight: '70vh',
    backgroundSize: '2100px',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '-8vh',
    backgroundPosition: 'top  , right',
    background: `url(${image})`,
    alignItems: 'center',
  },
  card: {
    textAlign: 'center',
    '& >div': {
      width: '50%',
      background: theme.palette.primary.light,
      //   [theme.breakpoints.down('md')]: {
      //     width: '80%',
      //   },

      margin: '0 auto',
      borderRadius: '5px',
      '& :first-child': {
        color: theme.palette.secondary.main,
      },
      '& :last-child': {
        color: theme.palette.secondary.light,
      },
    },
  },
}))

function Figures() {
  const items = [
    ['Eleves', 218],
    ['Familles', 100],
    ['Enseignants', 25],
    ['Jeux', 49],
  ]

  const Card = (props) => {
    const { item } = props
    const [name, count] = item
    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={3}
        display="flex"
        className={classes.card}
      >
        <div>
          <Typography variant="h3">{count} </Typography>
          <Typography variant="h4">{name}</Typography>
        </div>
      </Grid>
    )
  }
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      {items.map((item, index) => (
        <Card item={item} key={index} />
      ))}
    </Grid>
  )
}

export default Figures
