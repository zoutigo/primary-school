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
import styles from './styles'
import { useLocationColor } from '../../../utils/hooks'
import TabTitle from '../../others.js/TabTitle'
import randomkey from '../../../utils/randomkey'

function Main({ pages }) {
  const { main, ligth, dark } = useLocationColor()
  const [value, setValue] = React.useState(0)
  const TabPanelContainer = ({ page }) => (
    <div style={{ minHeight: '60vh' }}>{page.content}</div>
  )
  TabPanelContainer.propTypes = {
    page: PropTypes.shape({
      content: PropTypes.element.isRequired,
    }).isRequired,
  }

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
    children: PropTypes.element.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
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
                key={randomkey(123456789)}
                style={{ background: main }}
              />
            )
          })}
        </Tabs>
      </AppBar>
      {pages.map((page, index) => (
        <TabPanel
          value={value}
          key={randomkey(987654332)}
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

Main.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.element.isRequired,
    })
  ).isRequired,
}

export default Main
