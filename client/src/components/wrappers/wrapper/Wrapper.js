import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import Aside from '../aside/Aside'
import Main from '../main/Main'

function Wrapper({ pages, aside }) {
  if (aside) {
    return (
      <Grid container>
        <Grid item container md={12} lg={8}>
          <Main pages={pages} />
        </Grid>
        <Grid item container md={12} lg={4} style={{ padding: '0 0.2em' }}>
          <Aside {...aside} />
        </Grid>
      </Grid>
    )
  }
  return (
    <Grid container>
      <Grid item container>
        <Main pages={pages} />
      </Grid>
    </Grid>
  )
}
Wrapper.defaultProps = null

Wrapper.propTypes = {
  pages: PropTypes.shape({
    content: PropTypes.element,
  }).isRequired,
  aside: PropTypes.element,
}

export default Wrapper
