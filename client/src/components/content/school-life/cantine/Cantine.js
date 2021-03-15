import React from 'react'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import MenuArchives from './menuArchives/MenuArchives'
import MenuOfTheWeek from './menuOfTheWeek/MenuOfTheWeek'

function Cantine() {
  const pages = [
    {
      title: 'Menu de la semaine',
      content: <MenuOfTheWeek />,
    },
    {
      title: 'Menus archivés',
      content: <MenuArchives />,
    },
  ]
  const datas = { pages }

  return <Wrapper {...datas} />
}

export default Cantine
