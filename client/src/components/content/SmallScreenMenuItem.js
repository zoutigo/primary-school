import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/styles'
import { Typography, IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import SmallScreenMenuSubItem from './SmallScreenMenuSubItem'
import { toogleSmallScreenMenu } from '../../redux/settings/settingsActions'
import randomkey from '../../utils/randomkey'

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

function SmallScreenMenuItem({ categories, rubric }) {
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
      {categories.map((category, i) => (
        <div key={randomkey(987654432)}>
          <div>
            <div className={classes.linkbox}>
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
                <Typography variant="h6">{category.designation}</Typography>
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
              category.chapters.map((chapter) => (
                <SmallScreenMenuSubItem
                  key={randomkey(9876543321)}
                  chapter={chapter}
                  rubric={rubric}
                  handleClick={handleClick}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

SmallScreenMenuItem.propTypes = {
  categories: PropTypes.object,
  rubric: PropTypes.object,
}

export default SmallScreenMenuItem
