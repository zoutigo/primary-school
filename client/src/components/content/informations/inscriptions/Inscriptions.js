import React from 'react'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import Formalite from './Formalite'
import Jalons from './Jalons'

function Inscriptions() {
  const pages = [
    {
      title: `Formalités d'incription`,
      content: <Formalite />,
    },
    {
      title: `Jalons`,
      content: <Jalons />,
    },
  ]

  const itemsDatas = [
    ["Formulaire d'inscription", '...telecharger'],
    ['contribution des familles', '...telecharger'],
    ['reglement interieur', '...telecharger'],
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

export default Inscriptions
