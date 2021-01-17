import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Grid } from '@material-ui/core'
import Agenda from './Agenda'
import ToogleButton from '../../../utils/ToogleButton'
import { useLocation } from 'react-router-dom'
import {
  showClassroom,
  showPapers,
  tooglePaperForm,
} from '../../../redux/settings/settingsActions'
import TabPanelContent from './TabPanelContent'
import PaperForm from './PaperForm'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: '1em',
    width: '100%',
    '& >div': {
      width: '100%',
      padding: '0 0.5em',
    },
  },
  appbar: {
    margin: 'auto',
    background: 'blue',
    '& ~div': {
      background: 'pink',
      width: '100%',
      textAlign: 'left',
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

function Papers() {
  const classes = useStyles()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const displayPapers = useSelector((state) => state.settings.displayPapers)
  const displayPaperForm = useSelector(
    (state) => state.settings.displayPaperForm
  )
  const [value, setValue] = React.useState(0)
  const [openPapers, setOpenPapers] = React.useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handlePost = () => dispatch(tooglePaperForm())
  const handleToggle = () => {
    dispatch(showClassroom())
    dispatch(showPapers())
    window.scrollTo(0, 0)
  }

  const pageActualites = pathname === '/informations/actualites'

  useEffect(() => {
    !pageActualites && setOpenPapers(true)
  }, [pathname])

  const tabs = ['Mon fil', 'articles', 'events', 'important']
  const TabPanelContainer = (props) => {
    const { tab } = props
    return (
      <div style={{ minHeight: '60vh' }}>
        <TabPanelContent tab={tab} />
      </div>
    )
  }

  if ((displayPapers && openPapers) || pageActualites)
    return (
      <Grid container className={`${classes.root} `}>
        {!displayPaperForm ? (
          <Grid item sm={12} md={8} lg={9}>
            <AppBar position="static" className={classes.appbar}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="MON FIL" {...a11yProps(0)} />
                <Tab label="LES ARTICLES" {...a11yProps(1)} />
                <Tab label="LES NEWS" {...a11yProps(2)} />
                <Tab label="LES EVENEMENTS" {...a11yProps(3)} />
                <Tab label="IMPORTANT" {...a11yProps(4)} />
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
        ) : (
          <Grid item sm={12} md={8} lg={9}>
            {' '}
            <PaperForm />{' '}
          </Grid>
        )}

        <Grid item sm={12} md={4} lg={3}>
          <Agenda />
          {!pageActualites && (
            <div onClick={handleToggle}>
              <ToogleButton text={`Revenir sur la classe`} />
            </div>
          )}
          <div onClick={handlePost}>
            <ToogleButton text={'Poster un actualité'} />
          </div>
        </Grid>
      </Grid>
    )
  return null
}

export default Papers
