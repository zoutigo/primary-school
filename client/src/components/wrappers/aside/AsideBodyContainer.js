import { withStyles } from '@material-ui/styles'
import React from 'react'
import AsideItem from './AsideItem'
import { Grid } from '@material-ui/core'

const styles = (theme) => ({
  root: {
    width: '80%',
    marginLeft: '20%',
  },
})

function AsideBodyContainer({ items, rubricColors }) {
  const BodyContainer = withStyles(styles)(
    ({ classes, items, rubricColors }) => (
      <Grid item container className={classes.root}>
        {items.map((item, i) => {
          return <AsideItem item={item} rubricColors={rubricColors} key={i} />
        })}
      </Grid>
    )
  )
  return <BodyContainer items={items} rubricColors={rubricColors} />
}

export default AsideBodyContainer
