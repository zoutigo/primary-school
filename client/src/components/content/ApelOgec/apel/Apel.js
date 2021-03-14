import ReactHtmlParser from 'react-html-parser'
import React from 'react'
import { useQuery } from 'react-query'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import { apiFecthPage } from '../../../../utils/api'
import { APELTEAM } from '../../../../utils/constants'
import AsideSubTitle from '../../../wrappers/aside/AsideSubTitle'
import AsideUser from '../../../wrappers/aside/AsideUser'
import Trombi from '../../../../utils/trombi/Trombi'
import Activities from '../../../../utils/activities/Activities'

function Apel() {
  const pageName = 'apel'

  const { isLoading, isError, data, error } = useQuery(
    ['apel', { alias: pageName }],
    apiFecthPage,
    {
      retry: 1,
      retryDelay: 500,
    }
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    console.log('error', error)
    return <span>Error: {error.message}</span>
  }

  const ApelContent = () => <div>{ReactHtmlParser(data[0].text)}</div>

  const pages = [
    {
      title: `L'APEL`,
      content: <ApelContent />,
    },
    {
      title: `ACTIVITES`,
      content: <Activities />,
    },
    {
      title: `TROMBI`,
      content: <Trombi />,
    },
  ]

  const aside = {
    title: "Bureau de l'OGEC",
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
