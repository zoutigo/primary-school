import React from 'react'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import Equipments from './equipments/Equipments'
import VirtualVisit from './virtualvisit/VirtualVisit'

function Infrastructures() {
  const pages = [
    {
      title: 'Les équipements',
      content: <Equipments />,
    },
    {
      title: 'Visite guidée',
      content: <VirtualVisit />,
    },
  ]
  const datas = { pages }

  return <Wrapper {...datas} />
}

export default Infrastructures
