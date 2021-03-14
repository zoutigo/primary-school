import { Box, Grid, styled, Typography } from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'

import React from 'react'
import { useQuery } from 'react-query'
import { apiFecthPage } from '../../../utils/api'
import Wrapper from '../../wrappers/wrapper/Wrapper'
import { OGECTEAM } from '../../../utils/constants'

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

  const StyledAsideItem = styled(Box)(({ theme }) => ({
    '& >:first-child': {
      marginRight: '1em',
    },
    '& >:nth-child(2)': {
      textTransform: 'capitalize',
    },
    '& >:last-child': {
      textTransform: 'uppercase',
      marginLeft: '1em !important',
    },
  }))
  const StyledRole = styled(Box)(({ theme }) => ({
    textTransform: 'capitalize',
  }))

  const Member = ({ gender, firstname, lastname }) => (
    <StyledAsideItem>
      <Typography variant="body2">{gender}</Typography>
      <Typography variant="body2"> {firstname}</Typography>
      <Typography variant="body2"> {lastname}</Typography>
    </StyledAsideItem>
  )

  const Role = ({ role }) => (
    <StyledRole>
      <Typography variant="h6">{role}</Typography>
    </StyledRole>
  )

  const aside = {
    title: "Bureau de l'OGEC",
    items: OGECTEAM.map((member) => {
      const { role, gender, firstname, lastname } = member
      return {
        subtitle: <Role role={role} />,
        text: (
          <Member gender={gender} firstname={firstname} lastname={lastname} />
        ),
      }
    }),
  }

  const datas = { pages, aside }
  return <Wrapper {...datas} />
}

export default Ogec
