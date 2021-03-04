import React from 'react'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import ProjetPedagogique from './ProjetPedagogique'
import ProjetPastoral from './ProjetPastoral'
import ProjetEducatif from './ProjetEducatif'

function Projects() {
  const pages = [
    {
      title: 'Projet Educatif',
      content: <ProjetEducatif />,
    },
    {
      title: 'Pedagogique',
      content: <ProjetPedagogique />,
    },
    {
      title: 'Projet Pastoral',
      content: <ProjetPastoral />,
    },
  ]
  const aside = {
    title: 'Projets en cours',
    items: [
      {
        subtitle: 'Projet 1',
        text: 'Recolte de gambas',
      },
    ],
  }
  const datas = { pages, aside }
  return <Wrapper {...datas} />
}

export default Projects
