import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import ClassroomSummary from './ClassroomSummary'

import Wrapper from '../../../wrappers/wrapper/Wrapper'
import { apiFecthClassroom } from '../../../../utils/api'
import ClassroomNews from './ClassroomNews'
import AsideUser from '../../../wrappers/aside/AsideUser'
import AsideSubTitle from '../../../wrappers/aside/AsideSubTitle'
import Activities from '../../../../utils/activities/Activities'

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
    return (
      <span>
        Error:
        {error.message}
      </span>
    )
  }
  const { _id: id, summary, image } = data
  const pages = [
    {
      title: name,
      content: (
        <ClassroomSummary
          alias={alias}
          summary={summary}
          image={image}
          id={id}
        />
      ),
    },
    {
      title: 'ACTIVITES',
      content: <Activities entity={alias} pageName={alias} type="activite" />,
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
    const { name: lastname, firstname, gender } = teacher
    asideItems.push([
      0,
      <AsideSubTitle subtitle="enseignants" key="0" />,
      AsideUser({ lastname, firstname, gender }),
    ])
  }
  if (helper) {
    const { name: lastname, firstname, gender } = helper
    asideItems.push([
      1,
      <AsideSubTitle subtitle="aide maternelle" key="1" />,
      AsideUser({ lastname, firstname, gender }),
    ])
  }

  // sort the asideitems array

  asideItems.sort((a, b) => a[0] - b[0])

  const aside = {
    title: 'INFORMATIONS',
    items: asideItems.map((item) => ({
      subtitle: item[1],
      text: item[2],
    })),
  }

  const datas = { pages, aside }
  return <Wrapper {...datas} />
}

export default Classroom
