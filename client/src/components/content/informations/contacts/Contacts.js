import React from 'react'
import { IconButton } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import ContactForm from './ContactForm'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import AsideSubTitle from '../../../wrappers/aside/AsideSubTitle'
import { CONTACTS } from '../../../../utils/constants'
import Adress from '../../../others.js/Adress'
import Location from './Location'
import Opening from './Opening'

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
      title: `Formulaire`,
      content: <ContactForm />,
    },
  ]

  const { email, phone } = CONTACTS
  const phoneString = `tel:${phone}`
  const emailString = `mailto:${phone}`

  const EmailItemIcon = () => (
    <IconButton href={emailString}>
      <EmailIcon style={{ fontSize: 70 }} />
    </IconButton>
  )
  const PhoneItemIcon = () => (
    <IconButton href={phoneString}>
      <PhoneIcon style={{ fontSize: 70 }} />
    </IconButton>
  )
  const AdressItemIcon = () => (
    <IconButton>
      <LocationOnIcon style={{ fontSize: 70 }} />
    </IconButton>
  )
  const itemsDatas = [
    ['adresse', <Adress key="adress" />, <AdressItemIcon key="adress" />],
    ['Telephone', phone, <PhoneItemIcon key="phone" />],
    ['Email', email, <EmailItemIcon key="email" />],
  ]

  const aside = {
    title: 'Cordonnées',
    items: itemsDatas.map((item) => ({
      subtitle: <AsideSubTitle subtitle={item[0]} />,
      text: item[1],
      icon: item[2],
    })),
  }

  const datas = { pages, aside }
  return <Wrapper {...datas} />
}

export default Contacts
