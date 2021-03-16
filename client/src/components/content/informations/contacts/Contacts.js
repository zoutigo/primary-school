import React from 'react'
import Location from './Location'
import Opening from './Opening'
import ContactForm from './ContactForm'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import AsideSubTitle from '../../../wrappers/aside/AsideSubTitle'
import { CONTACTS } from '../../../../utils/constants'
import Address from './Address'

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

  const itemsDatas = [
    ['adresse', <Address {...adress} />],
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
