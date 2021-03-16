import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { StyledAdressContainer } from '../../../../utils/componentsStyled'

function Address({ index, street, zip, city }) {
  return (
    <StyledAdressContainer>
      <Box>
        <Typography variant="body2">{index} </Typography>
        <Typography variant="body2">{street} </Typography>
      </Box>
      <Box>
        <Typography variant="body2">{zip} </Typography>
        <Typography variant="body2">{city} </Typography>
      </Box>
    </StyledAdressContainer>
  )
}

export default Address
