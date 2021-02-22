import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/styles'
import { Button, Typography, IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import SmallScreenMenuSubItem from './SmallScreenMenuSubItem'
import {
  toogleSmallScreenMenu,
  openSubMenu,
} from '../../redux/settings/settingsActions'

const useStyles = makeStyles((theme) => ({
  root: {},
  linkbox: {
    minWidth: '100vw',
    minHeight: '3rem',
    background: theme.palette.third.ligth,
    border: 'white 1px solid',
    display: 'flex',

    '&:hover': {
      background: theme.palette.success.light,
      color: 'red',
    },
    '& a': {
      // background:'black',
      flexGrow: 1,
      marginLeft: '20%',
    },
    '& div': {
      //   background:'orange',
      width: '20%',
      borderLeft: 'white solid 1px',
      textAlign: 'center',
    },
  },
  subcategory: {
    '& div': {
      paddingLeft: '40%',
      '&:hover': {
        background: theme.palette.success.light,
        color: 'red',
      },
    },
  },
}))

function SmallScreenMenuItem({ categories, rubric, index }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [Categories, setCategories] = useState(categories)

  const handleClick = () => {
    dispatch(toogleSmallScreenMenu())
  }
  const toogleCategory = (index) => {
    const newCategories = { ...Categories }
    newCategories[index].subdisplay = !Categories[index].subdisplay
    setCategories(newCategories)
  }
  return (
    <div className={classes.root}>
      {categories.map((category, i) => {
        return (
          <div key={i}>
            <div>
              <div key={i} className={classes.linkbox}>
                <NavLink
                  to={{
                    pathname: category.link,
                    rubric: rubric,
                    category: category.designation,
                    chapters: category.chapters,
                    state: {
                      from: pathname,
                      rubric: rubric,
                      category: {
                        name: category.designation,
                        alias: category.alias,
                      },
                    },
                  }}
                  onClick={handleClick}
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  activeClassName={classes.active}
                >
                  <Typography variant="h6"> {category.designation} </Typography>
                </NavLink>
                {category.chapters && (
                  <div>
                    <span onClick={() => toogleCategory(i)}>
                      <IconButton>
                        <KeyboardArrowDownIcon />
                      </IconButton>
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className={classes.subcategory}>
              {Categories[i].subdisplay &&
                category.chapters &&
                category.chapters.map((chapter, i) => {
                  return (
                    <SmallScreenMenuSubItem
                      key={i}
                      chapter={chapter}
                      rubric={rubric}
                      handleClick={handleClick}
                    />
                  )
                })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SmallScreenMenuItem
