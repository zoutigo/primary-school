import { Box, styled } from '@material-ui/core'

export const StyledFooterElementTitle = styled(Box)(({ theme }) => ({}))
export const StyledFooterElement = styled(Box)(({ theme }) => ({
  marginBottom: '1rem !important',
}))
export const StyledFooterElementContent = styled(Box)(({ theme }) => ({}))
export const StyledFooterElementText = styled(Box)(({ theme }) => ({
  marginTop: '1rem !important',
  '& >*': {
    display: 'inline',
    verticalAlign: 'middle',
    // marginLeft: '1rem !important',
  },
  '& >:nth-child(2)': {
    marginLeft: '1rem !important',
  },
}))
