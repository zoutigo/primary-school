import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

function ChapterCard(props) {
  const classes = useStyles()
  const history = useHistory()
  const [expanded, setExpanded] = React.useState(false)
  const { element } = props
  const { alias, designation, link } = element
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleClick = () => history.push(link)
  const image = require(`../../images/rubrics${link}/primary.jpg`)
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

export default ChapterCard
