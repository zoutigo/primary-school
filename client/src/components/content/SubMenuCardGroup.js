import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import ChapterCard from './ChapterCard'
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
  const { pathname, categories, chapters } = useLocation()
  console.log('categories:', categories)
  const classes = useStyles()

  const elements = chapters || categories

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
            <div key={index} className={width()} style={{ color: 'green' }}>
              <ChapterCard element={element} />
            </div>
          )
        })}
    </div>
  )
}

export default SubMenuCardGroup
