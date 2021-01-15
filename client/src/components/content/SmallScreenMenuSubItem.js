import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { NavLink, useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {},
  chapter: {
    '& div': {
      paddingLeft: '40%',
      '&:hover': {
        background: theme.palette.success.light,
        color: 'red',
      },
    },
  },
}))

function SmallScreenMenuSubItem(props) {
  const classes = useStyles()
  const { pathname } = useLocation()
  const { chapter, rubric, handleClick } = props
  const [show, setShow] = useState(false)

  return (
    <div className={classes.root}>
      <NavLink
        to={{
          pathname: chapter.link,
          rubric: rubric,
          chapter: chapter.designation,
          state: {
            from: pathname,
          },
        }}
        onClick={handleClick}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
        activeClassName={classes.active}
      >
        <Typography variant="h6"> {chapter.designation} </Typography>
      </NavLink>
    </div>
  )
}

export default SmallScreenMenuSubItem
