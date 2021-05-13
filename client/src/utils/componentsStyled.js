import { Box, Button, ButtonGroup, Grid, TextField } from '@material-ui/core'
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

export const StyledForm = styled('form')(({ bgcolor }) => ({
  height: '3em',
  padding: '0.5em !important',
  background: bgcolor,
}))
export const StyledInfoBox = styled(Box)(({ bgcolor }) => ({
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
export const StyledHomeSection = styled(Grid)(({ theme }) => ({
  padding: '2rem 3rem !important',
  [theme.breakpoints.down('sm')]: {
    padding: '2rem 0.6rem !important',
  },
}))
export const StyledInputTextFieldControl = styled(TextField)(({ width }) => ({
  margin: '8px',
  minHeight: '3rem',
  background: 'yellow',
  width: width,
}))
