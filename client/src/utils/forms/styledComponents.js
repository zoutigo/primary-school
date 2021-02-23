import { Button, styled } from '@material-ui/core'

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
  position: 'relative',
  height: '3em',
  padding: '0.5em !important',
  background: bgcolor,
  // background: theme.palette.primary.main,
}))

export { StyledForm, StyledPrivateForm, StyledPrivateButton }
