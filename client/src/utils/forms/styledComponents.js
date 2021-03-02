import { Box, Button, Grid, styled } from '@material-ui/core'

const StyledForm = styled('form')(({ theme }) => ({
  marginTop: '8em',
  position: 'relative',
  // background: theme.palette.primary.main,
}))
const StyledPrivateForm = styled('form')(({ theme }) => ({
  marginTop: '1em !important',
  position: 'relative',
  width: '100%',
  // background: theme.palette.primary.main,
}))
const StyledPrivateButton = styled(Button)(({ theme, bgcolor }) => ({
  height: '3em',
  padding: '0.5em !important',
  background: bgcolor,

  // background: theme.palette.primary.main,
}))
const StyledPrivateAdminMainContainer = styled(Grid)(({ theme }) => ({
  padding: '0.5em !important',
  border: '1px solid gray',
}))
const StyledTitle = styled(Box)(({ theme, bgcolor }) => ({
  height: '2.5em',
  width: '100%',
  padding: '10px !important',
  background: theme.palette.secondary.light,
}))

export {
  StyledForm,
  StyledPrivateForm,
  StyledPrivateButton,
  StyledPrivateAdminMainContainer,
  StyledTitle,
}
