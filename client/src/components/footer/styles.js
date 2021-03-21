import { Box, styled } from '@material-ui/core'

export const StyledFooterElementTitle = styled(Box)(({ theme }) => ({}))
export const StyledFooterElement = styled(Box)(({ theme }) => ({
  marginBottom: '1rem !important',
  textAlign: 'center',
}))
export const StyledFooterElementContent = styled(Box)(({ theme }) => ({}))
export const StyledFooterElementText = styled(Box)(({ theme }) => ({
  marginTop: '1rem !important',
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

export const StyledAdressContainer = styled(Box)(({ theme }) => ({
  background: 'yellow',
  display: 'flex',
  justifyContent: 'center',
  //   paddingLeft: '1rem !important',
  '& >:last-child': {
    textAlign: 'left',
    paddingLeft: '1rem',
  },
  '& >:first-child': {
    textAlign: 'left',
  },
}))
