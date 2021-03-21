import { Box, styled, Typography } from '@material-ui/core'
import React from 'react'

const StyledH1 = styled(Typography)(({ theme }) => ({
  fontSize: '12rem',
  fontWeight: 900,

  textTransform: 'uppercase',

  lineHeight: 1,
  WebkitTextStroke: `2px ${theme.palette.secondary.main}`,
  opacity: 0.7,
  color: 'transparent',
  marginLeft: '100px !important',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  backgroundImage: `linear-gradient(to bottom, transparent 50%, ${theme.palette.secondary.main} 50%)`,
  transition: 'background-position ease-out 0.4s',
  backgroundSize: '1% 200%',
  '&:hover': {
    backgroundPosition: '0% -100%',
  },
}))

const StyledContainer = styled(Box)(() => ({
  paddingTop: '15rem !important',
  position: 'relative',
  width: '100%',

  '& >video': {
    height: '100vh',
    width: '100vw',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}))

function Movie() {
  const media = require('../../../video/home.mp4')
  return (
    <StyledContainer style={{}}>
      <video src={media} autoPlay muted loop />

      <StyledH1 variant="h1"> ECOLE</StyledH1>
      <StyledH1 variant="h1"> SAINT AUGUSTIN</StyledH1>
      <StyledH1 variant="h1"> Cremieu</StyledH1>
    </StyledContainer>
  )
}

export default Movie
