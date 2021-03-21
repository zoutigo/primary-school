import { Box, Typography, styled } from '@material-ui/core'
import React from 'react'
import { CONTACTS } from '../../utils/constants'

const StyledAdressContainer = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
}))

function Adress() {
  const { adress } = CONTACTS
  const { index, street, zip, city } = adress
  return (
    <StyledAdressContainer>
      <Box>
        <Box style={{ textAlign: 'left' }}>
          <Typography variant="body2" style={{ display: 'inline' }}>
            {index}{' '}
          </Typography>
          <Typography variant="body2">{street} </Typography>
        </Box>
        <Box style={{ textAlign: 'left' }}>
          <Typography variant="body2" style={{ display: 'inline' }}>
            {zip}{' '}
          </Typography>
          <Typography variant="body2" style={{ display: 'inline' }}>
            {city}{' '}
          </Typography>
        </Box>
      </Box>
    </StyledAdressContainer>
  )
}

export default Adress
