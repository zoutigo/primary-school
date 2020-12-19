import React from 'react'
import { makeStyles } from '@material-ui/styles'
import TitlePanel from '../../../utils/TitlePanel'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'red',
    padding: '0px 1em 1em 1em',
    marginBottom: '1em',
  },
  titlePanelBackground: {
    background: 'blue',
  },
}))

function Alert() {
  const classes = useStyles()
  const title = `alertes info`
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

export default Alert
