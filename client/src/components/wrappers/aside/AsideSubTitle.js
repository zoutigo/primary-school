import { Box, styled, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const StyledAsideSubTitle = styled(Box)(({ theme }) => ({
  textTransform: 'capitalize',
}))

function AsideSubTitle({ subtitle }) {
  return (
    <StyledAsideSubTitle>
      <Typography variant="h6">{subtitle}</Typography>
    </StyledAsideSubTitle>
  )
}

AsideSubTitle.propTypes = {
  subtitle: PropTypes.string,
}

export default AsideSubTitle
