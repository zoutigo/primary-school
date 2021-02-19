import React from 'react'
import { Box, Typography, withStyles } from '@material-ui/core'

function AsideTitle({ rubricColors, title }) {
  const styles = (theme) => ({
    root: {
      height: '2.8em',
      width: '100%',
    },
    box: {
      width: '80%',
      background: rubricColors.main,
      marginLeft: '20%',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0 auto',
      },
    },
  })

  const PageTitle = withStyles(styles)(({ classes, title, rubricColors }) => (
    <div className={classes.root} data-testid="wrapper-aside-title">
      <Box className={classes.box} data-testid="wrapper-aside-title-box">
        <Typography variant="h6">{title}</Typography>
      </Box>
    </div>
  ))

  return <PageTitle title={title} rubricColors={rubricColors} />
}

export default AsideTitle
