import React from 'react'

import { useLocation } from 'react-router-dom'
import ClassroomSummary from './ClassroomSummary'

import Wrapper from '../../../wrappers/wrapper/Wrapper'
import { useQuery } from 'react-query'
import { apiFecthClassroom } from '../../../../utils/api'
import ClassroomArticles from './ClassroomArticles'
import ClassroomNews from './ClassroomNews'
import { Box, styled, Typography } from '@material-ui/core'

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

  // construction de l'aside
  const { teacher, helper, students, email } = data

  const StyledUserItem = styled(Box)(({ theme, bgcolor }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& >:first-child': {
      textTransform: 'capitalize',
    },
    '& >:nth(2)-child': {
      textTransform: 'uppercase',
      color: 'red',
    },
    '& >:last-child': {
      textTransform: 'uppercase',
    },
    '& >div': {
      marginRight: '7px',
    },
  }))
  const StyledSubTitle = styled(Box)(({ theme, bgcolor }) => ({
    textTransform: 'uppercase',
    margin: '0.3em auto !important',
  }))

  const UserItem = ({ gender, firstname, name }) => (
    <StyledUserItem>
      <Box>
        <Typography variant="span">{gender}</Typography>
      </Box>
      <Box>
        <Typography variant="span">{firstname}</Typography>
      </Box>
      <Box>
        <Typography variant="span">{name}</Typography>
      </Box>
    </StyledUserItem>
  )
  const SubTitle = (title) => (
    <StyledSubTitle>
      <Typography variant="h6"> {title}</Typography>
    </StyledSubTitle>
  )

  const asideItems = [
    [0, SubTitle('enseignant'), UserItem(teacher)],
    [2, SubTitle('elèves'), students],
    [3, SubTitle('contacts'), email],
  ]
  if (helper) {
    asideItems.push([1, SubTitle('aide maternelle'), UserItem(helper)])
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
