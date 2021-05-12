import React from 'react'
import { Box, Grid, styled, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const StyledAsideTitleContainer = styled(Grid)(() => ({
  height: '3.5rem',
}))

function AsideTitle({ rubricColors, title }) {
  const StyledBox = styled(Box)(({ theme }) => ({
    width: '100%',
    background: rubricColors.main,
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: '0 auto',
    },
  }))

  return (
    <StyledAsideTitleContainer data-testid="wrapper-aside-title">
      <StyledBox data-testid="wrapper-aside-title-box">
        <Typography variant="h2">{title}</Typography>
      </StyledBox>
    </StyledAsideTitleContainer>
  )
}

AsideTitle.propTypes = {
  rubricColors: PropTypes.shape({
    ligth: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    dark: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
}

export default AsideTitle
