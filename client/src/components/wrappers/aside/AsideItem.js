import React from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const styles = {
  root: {
    boxSizing: 'border-box',
    width: '100%',
    textAlign: 'center',
    minHeight: '5em',
  },
}

function AsideItem({ item, rubricColors }) {
  const { subtitle, text } = item
  const Item = withStyles(styles)(({ classes, rubricColors }) => (
    <Paper
      className={classes.root}
      style={{ background: rubricColors.ligth }}
      data-testid="wrapper-aside-item"
    >
      <Box>{subtitle}</Box>
      <Box>{text} </Box>
    </Paper>
  ))

  return <Item item={item} rubricColors={rubricColors} />
}

export default AsideItem
