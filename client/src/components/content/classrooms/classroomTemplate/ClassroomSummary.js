import { Box, styled } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import { apiFecthClassroom } from '../../../../utils/api'

const StyledClassroomContainer = styled(Box)(({ theme, bgcolor }) => ({
  height: '3em',
  padding: '0.5em !important',
  background: bgcolor,
}))
const StyledImageContainer = styled(Box)(({ theme, bgcolor }) => ({
  height: '3em',
  padding: '0.5em !important',
  background: bgcolor,
  width: '100%',
}))
const StyledTextContainer = styled(Box)(({ theme, bgcolor }) => ({
  height: '3em',
  padding: '0.5em !important',
  background: bgcolor,
  width: '100%',
}))

function ClassroomSummary({ alias }) {
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

  return (
    <StyledClassroomContainer>
      <StyledImageContainer></StyledImageContainer>
      <StyledTextContainer></StyledTextContainer>
    </StyledClassroomContainer>
  )
}

export default ClassroomSummary
