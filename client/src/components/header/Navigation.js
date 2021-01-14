import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Box } from '@material-ui/core'
import NavItem from './NavItem'
import rubrics from '../../utils/rubrics'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    minWidth: '100%',
    overflow: 'hidden',
    // background:'green'
  },
}))

function Navigation() {
  const classes = useStyles()
  //   const Rubrics = useSelector((state) => state.settings.rubrics)

  return (
    <Box className={classes.root}>
      {rubrics.map((rubric, index) => {
        if (rubric.alias !== 'home') {
          return <NavItem key={index} rubric={rubric} />
        }
        return null
      })}
    </Box>
  )
}

export default Navigation
