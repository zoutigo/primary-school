import { Box, styled, Typography } from '@material-ui/core'
import React from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import {
  StyledFooterElement,
  StyledFooterElementContent,
  StyledFooterElementText,
  StyledFooterElementTitle,
} from './styles'

import { CONTACTS } from '../../utils/constants'
import Address from '../content/informations/contacts/Address'
import { H3Title } from '../../utils/components'

export const StyledAdressContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  //   paddingLeft: '1rem !important',
  '& >:last-child': {
    textAlign: 'left',
    paddingLeft: '1rem',
  },
  '& >:first-child': {
    textAlign: 'left',
  },
}))

function Contact() {
  const { email, phone, adress } = CONTACTS

  return (
    <StyledFooterElement>
      <StyledFooterElementTitle>
        {H3Title('Nous contacter')}
      </StyledFooterElementTitle>
      <StyledFooterElementContent>
        <StyledAdressContainer>
          <LocationOnIcon />
          <Address {...adress} />
        </StyledAdressContainer>

        <StyledFooterElementText>
          <PhoneIcon />
          <Typography variant="body2">{phone}</Typography>
        </StyledFooterElementText>
        <StyledFooterElementText>
          <EmailIcon />
          <Typography variant="body2">{email} </Typography>
        </StyledFooterElementText>
      </StyledFooterElementContent>
    </StyledFooterElement>
  )
}

export default Contact
