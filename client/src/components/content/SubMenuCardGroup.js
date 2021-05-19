import React from 'react'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import ChapterCard from './ChapterCard'
import randomkey from '../../utils/randomkey'

const useStyles = makeStyles(() => ({
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
  const classes = useStyles()

  const { categories, chapters } = useLocation()

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
        elements.map((element) => (
          <div
            key={randomkey(987654321)}
            className={width()}
            style={{ color: 'green' }}
          >
            <ChapterCard element={element} />
          </div>
        ))}
    </div>
  )
}

export default SubMenuCardGroup
