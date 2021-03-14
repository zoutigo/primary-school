import ReactHtmlParser from 'react-html-parser'

import React from 'react'
import { useQuery } from 'react-query'

import Wrapper from '../../../wrappers/wrapper/Wrapper'
import { OGECTEAM } from '../../../../utils/constants'
import { apiFecthPage } from '../../../../utils/api'
import AsideUser from '../../../wrappers/aside/AsideUser'
import AsideSubTitle from '../../../wrappers/aside/AsideSubTitle'

function Ogec() {
  const pageName = 'ogec'
  const { isLoading, isError, data, error } = useQuery(
    ['ogec', { alias: pageName }],
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

  const OgecContent = () => <div>{ReactHtmlParser(data[0].text)}</div>

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
