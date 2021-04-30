import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Box,
  Tabs,
  Tab,
  AppBar,
  TabScrollButton,
  withStyles,
} from '@material-ui/core'
import { styles } from './styles'
import { useLocationColor } from '../../../utils/hooks'
import TabTitle from '../../others.js/TabTitle'

function Main({ pages }) {
  const { main, ligth, dark } = useLocationColor()
  const [value, setValue] = React.useState(0)
  const TabPanelContainer = ({ page }) => (
    <div style={{ minHeight: '60vh' }}>{page.content}</div>
  )
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
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const StyledMain = withStyles(styles)(({ classes, pages }) => (
    <Grid className={classes.root} item container>
      <AppBar
        position="static"
        className={classes.appBar}
        style={{ borderBottom: `solid 1px ${dark}` }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {pages.map((page, index) => {
            const { title } = page
            return (
              <Tab
                label={<TabTitle title={title} />}
                {...a11yProps(index)}
                key={index}
                style={{ background: main }}
              />
            )
          })}
        </Tabs>
      </AppBar>
      {pages.map((page, index) => (
        <TabPanel
          value={value}
          key={index}
          index={index}
          style={{ minWidth: '100%' }}
        >
          <TabPanelContainer page={page} />
        </TabPanel>
      ))}
    </Grid>
  ))

  return <StyledMain pages={pages} />
}

export default Main
