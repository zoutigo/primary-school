import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import ClassroomSummary from './ClassroomSummary'
import { Grid } from '@material-ui/core'
import ClassroomInfos from './ClassroomInfos'
import Papers from '../../papers/Papers'
import ToogleButton from '../../../../utils/ToogleButton'
import {
  showPapers,
  showClassroom,
} from '../../../../redux/settings/settingsActions'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import { useQuery } from 'react-query'
import { apiFecthClassroom } from '../../../../utils/api'
import ClassroomArticles from './ClassroomArticles'
import ClassroomNews from './ClassroomNews'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100vh',

    textAlign: 'center',
  },

  imgContainer: {
    borderRadius: '5px',

    '& img': {
      width: '40vw',
      height: '60vh',
    },
    '& h4': {
      textAlign: 'left',
      margin: '0px 12%',
    },
  },
  message: {
    width: '40vw',
    margin: 'auto',
  },
}))

function Classroom() {
  const { state } = useLocation()
  const classes = useStyles()
  const dispatch = useDispatch()
  const displayClassroom = useSelector(
    (state) => state.settings.displayClassroom
  )
  const { designation, pathname } = useLocation()

  const image = require('../../../../images/rubrics/classes/secondary.jpg')

  const { chapter, category, rubric } = state
  const { chaptername, alias } = chapter

  const { isLoading, isError, data, error } = useQuery(
    [alias, { alias: alias }],
    apiFecthClassroom,
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
    }
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
        <ClassroomSummary alias={alias} text={data.text} image={data.image} />
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

const message = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. `
