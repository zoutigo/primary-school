import ReactHtmlParser from 'react-html-parser'

import React from 'react'
import { useQuery } from 'react-query'

import Wrapper from '../../../wrappers/wrapper/Wrapper'
import { OGECTEAM } from '../../../../utils/constants'
import { apiFecthPage } from '../../../../utils/api'
import AsideUser from '../../../wrappers/aside/AsideUser'
import AsideSubTitle from '../../../wrappers/aside/AsideSubTitle'
import OgecContent from './OgecContent'

function Ogec() {
  const pages = [
    {
      title: `L'Ogec`,
      content: <OgecContent />,
    },
  ]

  const aside = {
    title: "Bureau de l'OGEC",
    items: OGECTEAM.map((member) => {
      const { role, gender, firstname, lastname } = member
      return {
        subtitle: <AsideSubTitle subtitle={role} />,
        text: (
          <AsideUser
            gender={gender}
            firstname={firstname}
            lastname={lastname}
          />
        ),
      }
    }),
  }

  const datas = { pages, aside }
  return <Wrapper {...datas} />
}

export default Ogec
