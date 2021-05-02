import React from 'react'

import Wrapper from '../../../wrappers/wrapper/Wrapper'
import { OGECTEAM } from '../../../../utils/constants'

import AsideUser from '../../../wrappers/aside/AsideUser'
import AsideSubTitle from '../../../wrappers/aside/AsideSubTitle'
import OgecContent from './OgecContent'
import Activities from '../../../../utils/activities/Activities'

function Ogec() {
  const pages = [
    {
      title: `L'Ogec`,
      content: <OgecContent />,
    },
    {
      title: 'ACTIVITES',
      content: (
        <Activities pageName="activites-ogec" entity="ogec" type="activity" />
      ),
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
