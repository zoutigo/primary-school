import React from 'react'
import Location from './Location'
import Opening from './Opening'
import ContactForm from './ContactForm'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import AsideSubTitle from '../../../wrappers/aside/AsideSubTitle'
import { Box, styled, Typography } from '@material-ui/core'
import { CONTACTS } from '../../../../utils/constants'

const StyledAdressContainer = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  '& *': {
    display: 'flex',
    justifyContent: 'center',
    marginRight: '5px !important',
  },
}))

function Contacts() {
  const pages = [
    {
      title: `Localisation`,
      content: <Location />,
    },
    {
      title: `Horaires`,
      content: <Opening />,
    },
    {
      title: `Formulaire de Contact`,
      content: <ContactForm />,
    },
  ]

  const { adress, phone, email } = CONTACTS

  const Adress = ({ index, street, zip, city }) => {
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
  const itemsDatas = [
    ['adresse', <Adress {...adress} />],
    ['Telephone', phone],
    ['Email', email],
  ]
  const aside = {
    title: 'Cordonnées',
    items: itemsDatas.map((item) => {
      return {
        subtitle: <AsideSubTitle subtitle={item[0]} />,
        text: item[1],
      }
    }),
  }

  const datas = { pages, aside }
  return <Wrapper {...datas} />
}

export default Contacts
