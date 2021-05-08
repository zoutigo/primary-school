import React from 'react'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import Breves from './breves/Breves'
import CanteenMenus from './menus/CanteenMenus'

function Cantine() {
  const pages = [
    {
      title: 'Menus Hebdo',
      content: <CanteenMenus />,
    },
    {
      title: 'Brèves',
      content: <Breves />,
    },
  ]
  const datas = { pages }

  return <Wrapper {...datas} />
}

export default Cantine
