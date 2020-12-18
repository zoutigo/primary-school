import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      minWidth: '80vw',
      maxWidth: '80vw',
    },
  },
}))

const ContentCentering = (OldComponent) => {
  function NewComponent() {
    const classes = useStyles()
    const centering = classes.root

    return <OldComponent centeringClass={centering} />
  }

  return <NewComponent />
}

export default ContentCentering
