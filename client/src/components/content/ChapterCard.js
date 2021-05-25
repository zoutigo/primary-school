import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import image from '../../images/rubrics/classes/maternelle/primary.jpg'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

function ChapterCard({ element }) {
  const { state } = useLocation()
  const { rubric } = state
  // console.log('stateChaptercard', state)

  const classes = useStyles()
  const history = useHistory()
  // const [expanded, setExpanded] = React.useState(false)

  const { alias, designation, link } = element

  // const handleExpandClick = () => {
  //   setExpanded(!expanded)
  // }
  const handleClick = () =>
    history.push({
      pathname: link,

      state: {
        rubric: rubric,
        category: {
          alias: alias,
          name: designation,
        },
      },
    })
  // const image = require(`../../images/rubrics/classes/maternelle/primary.jpg`)

  // if (element.alias === 'maternelle') {
  //   return <div>maternelle</div>
  // }
  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={designation}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {designation}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

ChapterCard.propTypes = {
  element: PropTypes.shape({
    alias: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
}

export default ChapterCard
