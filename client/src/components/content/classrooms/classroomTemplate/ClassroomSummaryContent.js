import { Box, Grid, styled } from '@material-ui/core'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import { ToastContainer } from 'react-toastify'
import { useQuery } from 'react-query'
import { apiFecthClassroom } from '../../../../utils/api'

const StyledClassroomContainer = styled(Grid)(({ theme, bgcolor }) => ({
  padding: '0.1em !important',
  background: bgcolor,
}))
const StyledImageContainer = styled(Grid)(({ theme, bgcolor }) => ({
  height: '20vh',
  padding: '0.5em !important',
  background: 'yellow',
}))
const StyledTextContainer = styled(Box)(({ theme, bgcolor }) => ({
  padding: '0.5em !important',
  background: 'pink',
}))

function ClassroomSummaryContent({ alias, id: classroomId }) {
  const queryName = `classroom-${alias}`
  const queryKey = [queryName, classroomId]

  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFecthClassroom(classroomId)
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  console.log('b64_Image:', data.image)
  return (
    <StyledClassroomContainer item container>
      <Grid item>
        <ToastContainer />
      </Grid>

      <StyledImageContainer item container>
        <img src={data.image} />
        Here is the image
      </StyledImageContainer>

      <Grid item>
        <StyledTextContainer>
          {ReactHtmlParser(data.summary)}
        </StyledTextContainer>
      </Grid>
    </StyledClassroomContainer>
  )
}

export default ClassroomSummaryContent
