import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Grid } from '@material-ui/core'
import Alert from './Alert'
import ToogleButton from '../../../utils/ToogleButton'
import { useLocation } from 'react-router-dom'
import {
  showClassroom,
  showPapers,
} from '../../../redux/settings/settingsActions'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: '1em',
  },
  appbar: {
    width: '40vw',
    margin: 'auto',
  },
}))

function Papers() {
  const classes = useStyles()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const displayPapers = useSelector((state) => state.settings.displayPapers)
  const [value, setValue] = React.useState(0)
  const [openPapers, setOpenPapers] = React.useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleToggle = () => {
    dispatch(showClassroom())
    dispatch(showPapers())
  }

  useEffect(() => {
    pathname === '/' ? setOpenPapers(false) : setOpenPapers(true)
    return () => {
      setOpenPapers(false)
    }
  }, [pathname])
  if (displayPapers && openPapers)
    return (
      <Grid container className={`${classes.root} `} alignItems="start-end">
        <Grid item sm={12} md={8} lg={9}>
          <AppBar position="static" className={classes.appbar}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Grid>
        <Grid item sm={12} md={4} lg={3}>
          <Alert />
          <div onClick={handleToggle}>
            <ToogleButton text={`Revenir sur la classe`} />
          </div>
        </Grid>
      </Grid>
    )
  return null
}

export default Papers