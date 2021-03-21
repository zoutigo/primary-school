import { Box, Link, styled, Typography } from '@material-ui/core'
import React from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import {
  StyledAdressContainer,
  StyledFooterElement,
  StyledFooterElementContent,
  StyledFooterElementText,
  StyledFooterElementTitle,
} from './styles'

import { CONTACTS } from '../../utils/constants'
import Address from '../content/informations/contacts/Address'
import { H3Title } from '../../utils/components'

function Contact() {
  const { email, phone, adress } = CONTACTS
  const phoneString = `tel:${phone}`
  const emailString = `mailto:${email}`

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

          <Typography variant="body2">
            <Link href={phoneString}>{phone} </Link>
          </Typography>
        </StyledFooterElementText>
        <StyledFooterElementText>
          <EmailIcon />
          <Typography variant="body2">
            <Link href={emailString}>{email} </Link>
          </Typography>
        </StyledFooterElementText>
      </StyledFooterElementContent>
    </StyledFooterElement>
  )
}

export default Contact
