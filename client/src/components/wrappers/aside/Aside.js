import { Typography, Paper, Grid, Box } from '@material-ui/core'
import React from 'react'
import { useLocationColor } from '../../../utils/hooks'
import AsideBodyContainer from './AsideBodyContainer'
import AsideTitle from './AsideTitle'

function Aside({ title, items }) {
  const rubricColors = useLocationColor()

  return (
    <Grid
      container
      item
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <AsideTitle rubricColors={rubricColors} title={title} />
      <AsideBodyContainer items={items} rubricColors={rubricColors} />
    </Grid>
  )
}

export default Aside
