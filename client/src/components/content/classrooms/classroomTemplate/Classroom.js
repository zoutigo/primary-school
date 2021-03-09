import React from 'react'

import { useLocation } from 'react-router-dom'
import ClassroomSummary from './ClassroomSummary'

import Wrapper from '../../../wrappers/wrapper/Wrapper'
import { useQuery } from 'react-query'
import { apiFecthClassroom } from '../../../../utils/api'
import ClassroomArticles from './ClassroomArticles'
import ClassroomNews from './ClassroomNews'

function Classroom() {
  const { state } = useLocation()

  const { chapter, category, rubric } = state
  const { chaptername, alias } = chapter
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
      title: chaptername,
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

  const { teacher } = data
  const classroomInfos = [['enseignant', teacher]]

  const aside = {
    title: 'INFORMATIONS',
    items: classroomInfos.map((classroom) => {
      return {
        subtitle: classroom[0],
        text: classroom[1],
      }
    }),
  }

  const datas = { pages, aside }
  return <Wrapper {...datas} />
}

export default Classroom
