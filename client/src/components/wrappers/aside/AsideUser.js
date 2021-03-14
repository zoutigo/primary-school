import { Box, styled, Typography } from '@material-ui/core'
import React from 'react'

const StyledAsideUser = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& >:first-child': {
    textTransform: 'capitalize',
  },
  '& >:nth(2)-child': {
    textTransform: 'uppercase',
    color: 'red',
  },
  '& >:last-child': {
    textTransform: 'uppercase',
  },
  '& *': {
    marginRight: '7px !important',
  },
}))

function AsideUser({ gender, firstname, lastname }) {
  return (
    <StyledAsideUser>
      <Typography variant="body2">{gender}</Typography>
      <Typography variant="body2"> {firstname}</Typography>
      <Typography variant="body2"> {lastname}</Typography>
    </StyledAsideUser>
  )
}

export default AsideUser
