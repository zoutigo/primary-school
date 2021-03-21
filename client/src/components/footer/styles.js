import { Box, styled } from '@material-ui/core'

export const StyledFooterElementTitle = styled(Box)(({ theme }) => ({}))
export const StyledFooterElement = styled(Box)(({ theme }) => ({
  marginBottom: '1rem !important',
  textAlign: 'center',
}))
export const StyledFooterElementContent = styled(Box)(({ theme }) => ({}))
export const StyledFooterElementText = styled(Box)(({ theme }) => ({
  marginTop: '0.2rem !important',
  minHeight: '2.5rem',
  '& a': {
    textDecoration: 'none',
    color: 'inherit',
  },
  '& >*': {
    display: 'inline',
    verticalAlign: 'middle',
    // marginLeft: '1rem !important',
  },
  '& >:nth-child(2)': {
    marginLeft: '1rem !important',
  },
}))

export const StyledAdressBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& div': {
    marginLeft: '0.3rem',
  },
}))
