import React from 'react'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import faker from 'faker'
import { useTheme } from '@material-ui/styles'

function Projects() {
  const pages = [
    {
      title: 'Projet Educatif',
      content: faker.lorem.paragraphs(3),
    },
    {
      title: 'Projet Pastoral',
      content: faker.lorem.paragraphs(2),
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
