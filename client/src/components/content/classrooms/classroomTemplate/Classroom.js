import React from 'react'
import { useLocation } from 'react-router-dom'
import ClassroomSummary from './ClassroomSummary'

import Wrapper from '../../../wrappers/wrapper/Wrapper'
import { useQuery } from 'react-query'
import { apiFecthClassroom } from '../../../../utils/api'
import ClassroomArticles from './ClassroomArticles'
import ClassroomNews from './ClassroomNews'
import AsideUser from '../../../wrappers/aside/AsideUser'
import AsideSubTitle from '../../../wrappers/aside/AsideSubTitle'

function Classroom() {
  const { state } = useLocation()
  const { category } = state

  const { name, alias } = category
  const queryName = `classrom-${alias}`

  const { isLoading, isError, data, error } = useQuery([queryName, alias], () =>
    apiFecthClassroom(alias)
  )
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const pages = [
    {
      title: name,
      content: (
        <ClassroomSummary
          alias={alias}
          summary={data.summary}
          image={data.image}
          id={data._id}
        />
      ),
    },
    {
      title: 'ACTIVITES',
      content: <ClassroomArticles />,
    },
    {
      title: 'NEWS',
      content: <ClassroomNews />,
    },
    {
      title: 'ALBUMS',
      content: 'MA BELLE FETE',
    },
  ]

  // construction de l'aside
  const { teacher, helper, students, email } = data

  const asideItems = [
    [2, <AsideSubTitle subtitle="élèves" key="2" />, students],
    [3, <AsideSubTitle subtitle="contacts" key="3" />, email],
  ]

  if (teacher) {
    let { name: lastname, firstname, gender } = teacher
    asideItems.push([
      0,
      <AsideSubTitle subtitle="enseignants" key="0" />,
      AsideUser({ lastname, firstname, gender }),
    ])
  }
  if (helper) {
    let { name: lastname, firstname, gender } = helper
    asideItems.push([
      1,
      <AsideSubTitle subtitle="aide maternelle" key="1" />,
      AsideUser({ lastname, firstname, gender }),
    ])
  }

  // sort the asideitems array

  asideItems.sort(function (a, b) {
    return a[0] - b[0]
  })

  const aside = {
    title: 'INFORMATIONS',
    items: asideItems.map((item) => {
      return {
        subtitle: item[1],
        text: item[2],
      }
    }),
  }

  const datas = { pages, aside }
  return <Wrapper {...datas} />
}

export default Classroom
