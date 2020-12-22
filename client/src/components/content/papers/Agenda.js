import React from 'react'
import { makeStyles } from '@material-ui/styles'
import TitlePanel from '../../../utils/TitlePanel'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'whitesmoke',
    padding: '0px 0em 1em 0em',
    marginBottom: '1em',
  },
  titlePanelBackground: {
    background: 'blue',
  },
}))

function Agenda() {
  const classes = useStyles()
  const title = `Agenda à venir`
  return (
    <aside className={classes.root}>
      <TitlePanel title={title} background={classes.titlePanelBackground} />
      <ul>
        <li> Lorem</li>
        <li> Ipsum</li>
        <li> Dolor</li>
        <li> Si amet</li>
        <li> Lorem</li>
        <li> Dolor</li>
        <li> Lorem</li>
      </ul>
    </aside>
  )
}

export default Agenda
