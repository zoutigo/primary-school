import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import SubMenuCard from './SubMenuCard'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    maxWidth: '100%',
    display: 'flex',

    flexWrap: 'wrap',
    '& >div': {
      flex: 'auto',
      display: 'flex',
      justifyContent: 'center',
      margin: '1em auto',
    },
  },
  width2: {
    minWidth: '20vw',
  },
  width3: {
    minWidth: '32.5vw',
  },
}))

function SubMenuCardGroup() {
  const { pathname, categories, subcategories } = useLocation()
  const classes = useStyles()

  const elements = subcategories || categories

  const width = () => {
    switch (elements.length) {
      case 2:
        return classes.width2

      default:
        return classes.width2
    }
  }

  return (
    <div className={classes.root}>
      {elements &&
        elements.map((element, index) => {
          return (
            <div
              item
              key={index}
              className={width()}
              style={{ color: 'green' }}
            >
              <SubMenuCard element={element} />
            </div>
          )
        })}
    </div>
  )
}

export default SubMenuCardGroup
