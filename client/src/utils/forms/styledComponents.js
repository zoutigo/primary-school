import { Button, Grid, styled } from '@material-ui/core'

const StyledForm = styled('form')(({ theme }) => ({
  marginTop: '8em',
  position: 'relative',
  // background: theme.palette.primary.main,
}))
const StyledPrivateForm = styled('form')(({ theme }) => ({
  marginTop: '2em !important',
  position: 'relative',
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

export {
  StyledForm,
  StyledPrivateForm,
  StyledPrivateButton,
  StyledPrivateAdminMainContainer,
}
