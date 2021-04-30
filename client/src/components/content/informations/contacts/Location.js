import { Box, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import {
  StyledGridTabContainer,
  StyledInfoBox,
} from '../../../../utils/componentsStyled'

const mapStyle = {
  width: '100%',
  height: '50vh',
  frameborder: '0',
  // style: 'border:0;',
  border: 'none',
  allowfullscreen: '',
  ariaHidden: 'false',
  tabIndex: '0',
}

function Location() {
  const theme = useTheme()

  const text = `
  L'école Saint Augustin est située au coeur de la cité médiévale de
          Crémieu, sur la place principale,guarantissant un accès sécurisé à vos
          enfants.
  `

  return (
    <StyledGridTabContainer>
      <StyledInfoBox bgcolor={theme.palette.primary.light}>
        <Typography variant="body1">{text}</Typography>
      </StyledInfoBox>
      <Box>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2785.343539385944!2d5.247199615566198!3d45.72420487910498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b348b0abfafa1%3A0xb1106195636e64a!2sEcole%20Catholique%20Saint-Augustin%20de%20Cr%C3%A9mieu!5e0!3m2!1sfr!2sfr!4v1615719947724!5m2!1sfr!2sfr"
          style={mapStyle}
        ></iframe>
      </Box>
    </StyledGridTabContainer>
  )
}

export default Location
