import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { Grid } from '@material-ui/core'

import WelcomeMessage from './WelcomeMessage'
import Administration from './administration/Administration'
import MyDatas from './mydatas/MyDatas'
import MyDrafts from './drafts/MyDrafts'
import MyAgenda from './myagendas/MyAgendas'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: '1em',
    width: '100%',
  },
  appbar: {
    width: '100%',
    margin: 'auto',
    background: 'blue',
    '& ~div': {
      background: 'pink',
      width: '100%',
      margin: 'auto',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}))

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
        <Box p={3} variant="div">
          {children}
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

function Private() {
  const location = useLocation()
  const classes = useStyles()
  const { from } = location.state

  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { isLogged, Credentials } = useSelector((state) => state.user)
  const { role } = Credentials
  const isAdmin = role === 'admin'

  const tabs = ['datas', 'administration', 'drafts', 'agendas']
  const TabPanelContainer = (props) => {
    const { tab } = props
    return (
      <div style={{ minHeight: '60vh' }}>
        <TabPanelContent tab={tab} />
      </div>
    )
  }
  const TabPanelContent = (props) => {
    const { tab } = props
    switch (tab) {
      case 'datas':
        return <MyDatas />
      case 'administration':
        return <Administration />
      case 'drafs':
        return <MyDrafts />
      case 'agendas':
        return <MyAgenda />

      default:
        return <MyDatas />
    }
  }

  if (!isLogged) {
    return (
      <Redirect
        to={{
          pathname: 'private/login',
        }}
      />
    )
  }
  return (
    <Grid container className={classes.root}>
      {from && from === '/private/register' && <WelcomeMessage />}
      <Grid item container>
        <AppBar position="static" className={classes.appbar}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="MES DONNES" {...a11yProps(0)} />
            <Tab label="ADMINISTRATION" disabled={!isAdmin} {...a11yProps(1)} />
            <Tab label="MON AGENDA" {...a11yProps(2)} />
            <Tab label="MES BROUILLONS" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        {tabs.map((tab, index) => {
          return (
            <TabPanel value={value} key={index} index={index}>
              <TabPanelContainer tab={tab} />
            </TabPanel>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default Private
