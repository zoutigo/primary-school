import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

import CardContent from '@material-ui/core/CardContent'

import Avatar from '@material-ui/core/Avatar'

import Typography from '@material-ui/core/Typography'

import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem 0.8rem !important',

    [theme.breakpoints.down('md')]: {
      minWidth: '90%',
    },

    [theme.breakpoints.up('md')]: {
      minWidth: '80%',
    },
  },

  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    marginRight: '1rem !important',
    marginLeft: '2rem !important',
  },
  header: {
    background: theme.palette.secondary.main,
    color: 'white',
    height: '3.5rem',
  },
  content: {
    background: 'whitesmoke',
    padding: '0.5rem 1.8rem !important',
  },
}))

function NewsCard({ cardTitle, items, recipe }) {
  const classes = useStyles()

  const Title = (title) => <Typography variant="h4">{title}</Typography>
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {recipe}
          </Avatar>
        }
        title={Title(cardTitle)}
        // subheader="September 14, 2016"
      />

      <CardContent className={classes.content}>
        {items && items.map((item, i) => <Box key={i}>{item}</Box>)}
      </CardContent>
    </Card>
  )
}

NewsCard.propTypes = {
  cardTitle: PropTypes.string,
  recipe: PropTypes.string,
  items: PropTypes.array,
}

export default NewsCard
