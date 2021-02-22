import React from 'react'
import Wrapper from '../../../../wrappers/wrapper/Wrapper'
import Login from '../login/Login'
import Register from '../register/Register'

function Identification() {
  const pages = [
    {
      title: `Se Connecter`,
      content: <Login />,
    },
    {
      title: `S'enregistrer`,
      content: <Register />,
    },
  ]

  const aside = {
    title: 'Quelques chiffres',
    items: [
      {
        subtitle: 'Les inscrits',
        text: '1567',
      },
      {
        subtitle: 'Les articles',
        text: '627',
      },
    ],
  }

  const datas = { pages, aside }
  return <Wrapper {...datas} />
}

export default Identification
