import React from 'react'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import MenuArchives from './menuArchives/MenuArchives'
import MenuOfTheWeek from './menuOfTheWeek/MenuOfTheWeek'
import CanteenMenus from './menus/CanteenMenus'

function Cantine() {
  const pages = [
    {
      title: 'Menus Hebdo',
      content: <CanteenMenus />,
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
