import React from 'react'
import Location from './Location'
import Opening from './Opening'
import ContactForm from './ContactForm'
import Wrapper from '../../../wrappers/wrapper/Wrapper'

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

  const DATAS = {
    adresse: '114B Route de Cremieu, 38230 Tignieu Jameyzieu',

    phone: '0650597839',

    email: 'ogec-cremieu@yahoo.fr',
  }
  const itemsDatas = [
    ['adresse', DATAS.adresse],
    ['Telephone', DATAS.phone],
    ['email', DATAS.phone],
  ]
  const aside = {
    title: 'Cordonnées',
    items: itemsDatas.map((item) => {
      return {
        subtitle: item[0],
        text: item[1],
      }
    }),
  }

  const datas = { pages, aside }
  return <Wrapper {...datas} />
}

export default Contacts
