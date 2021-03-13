import React from 'react'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import Activities from './activities/Activities'
import Articles from './articles/Articles'
import NewsLetters from './newsletters/NewsLetters'
import ParentsInfos from './parentsinfos/ParentsInfos'

function Actualites() {
  const pages = [
    {
      title: `Articles`,
      content: <Articles />,
    },
    {
      title: 'Activités',
      content: <Activities />,
    },
    {
      title: `Newsletters`,
      content: <NewsLetters />,
    },
    {
      title: `Infos Parents`,
      content: <ParentsInfos />,
    },
  ]

  const aside = {
    title: 'Agenda',
    items: [
      {
        subtitle: '31-03-2021 / Ecole saint augustin',
        text: 'Conseil de classe',
      },
      {
        subtitle: '19-05-2021 / Stade Marcel Picot',
        text: 'Courseton',
      },
      {
        subtitle: '10-10-2021 / Ecole saint augustin',
        text: 'fete de la bière',
      },
      {
        subtitle: '31-10-2021 / Ecole saint augustin',
        text: 'Hallowwen Party Cremieu',
      },

      {
        subtitle: '15-12-2021 / place du village',
        text: 'Marché de Noel APEL',
      },
    ],
  }

  const datas = { pages, aside }
  return <Wrapper {...datas} />
}

export default Actualites
