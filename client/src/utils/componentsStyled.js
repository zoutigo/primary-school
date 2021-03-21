import { Box, Button, ButtonGroup, Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'

export const StyledGridTabContainer = styled(Grid)(({ theme, bgcolor }) => ({
  padding: '0.5em 0px 1em 0px!important',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}))

export const StyledButtonGroup = styled(ButtonGroup)(({ theme, bgcolor }) => ({
  height: '3em',
  marginTop: '1em !important',
}))

export const StyledButton = styled(Button)(({ theme, bgcolor }) => ({
  height: '3em',
  background: theme.palette.primary.main,
  padding: '0.5em 1em !important',
}))

export const StyledForm = styled('form')(({ theme, bgcolor }) => ({
  height: '3em',
  padding: '0.5em !important',
  background: bgcolor,
}))
export const StyledInfoBox = styled(Box)(({ theme, bgcolor }) => ({
  minHeight: '2em',
  width: '100%',
  padding: '0.5em !important',
  verticalAlign: 'center',
  background: bgcolor,
}))

export const StyledNavLink = styled(NavLink)(() => ({
  color: 'inherit',
  textDecoration: 'inherit',
}))
