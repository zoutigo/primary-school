import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0.5em 1em',
  },
}))

function TabPanelItem(props) {
  const classes = useStyles()

  const { paper } = props
  const { authorFirstname, authorName, createdAt, title, page, text } = paper
  const [show, setShow] = React.useState(false)

  return (
    <div className={classes.root} onClick={() => setShow(!show)}>
      <div> {authorFirstname} </div>
      <div> {title} </div>
      {show && <div> {text} </div>}
    </div>
  )
}

export default TabPanelItem
