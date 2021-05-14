import React from 'react'
import PropTypes from 'prop-types'

import { Grid, Typography } from '@material-ui/core'
import { makeStyles, styled } from '@material-ui/styles'
import image from '../../../../images/rubrics/home/landing/land7.JPG'
import FiguresCard from './FiguresCard'

const useStyles = makeStyles((theme) => ({
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

const StyledFiguresContainer = styled(Grid)(() => ({
  width: '100vw',
  minHeight: '70vh',
  // backgroundSize: '2100px',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: '-8vh',
  backgroundPosition: 'top  , right',
  background: `url(${image})`,
  alignItems: 'center',
  position: 'relative',
}))

function Figures() {
  const classes = useStyles()
  const items = [
    ['Eleves', 218, 0, '#85C48E'],
    ['Familles', 100, 1, '#C389BC'],
    ['Enseignants', 25, 2, '#EE701D'],
    ['Jeux', 49, 3, '#F9CE46'],
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
          <Typography variant="h3">{count}</Typography>
          <Typography variant="h4">{name}</Typography>
        </div>
      </Grid>
    )
  }
  Card.propTypes = {
    item: PropTypes.arrayOf(PropTypes.string, PropTypes.number).isRequired,
  }

  return (
    <StyledFiguresContainer container>
      {items.map((item) => (
        <FiguresCard figureitem={item} key={item} />
      ))}
    </StyledFiguresContainer>
  )
}

export default Figures
