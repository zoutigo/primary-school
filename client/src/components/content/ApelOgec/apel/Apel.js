import React from 'react'

import Wrapper from '../../../wrappers/wrapper/Wrapper'
import { APELTEAM } from '../../../../utils/constants'
import AsideSubTitle from '../../../wrappers/aside/AsideSubTitle'
import AsideUser from '../../../wrappers/aside/AsideUser'
import Trombi from '../../../../utils/trombi/Trombi'
import Activities from '../../../../utils/activities/Activities'
import ApelContent from './ApelContent'

function Apel() {
  const pages = [
    {
      title: `L'APEL`,
      content: <ApelContent />,
    },
    {
      title: `ACTIVITES`,
      content: (
        <Activities pageName="activites-apel" entity="apel" type="activite" />
      ),
    },
    {
      title: `TROMBI`,
      content: <Trombi />,
    },
  ]

  const aside = {
    title: "Bureau de l'APEL",
    items: APELTEAM.map((member) => {
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

export default Apel
