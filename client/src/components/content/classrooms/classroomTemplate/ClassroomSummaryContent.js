import { Box, Grid, styled } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

import ReactHtmlParser from 'react-html-parser'

import { ToastContainer } from 'react-toastify'
import { useQuery } from 'react-query'
import { apiFecthClassroom } from '../../../../utils/api'

const StyledClassroomContainer = styled(Grid)(() => ({
  padding: '0.1em !important',
}))
const StyledImageContainer = styled(Grid)(() => ({
  '& img': {
    width: '100%',
    objectFit: 'cover',
  },
  padding: '0.5em !important',
}))
const StyledTextContainer = styled(Box)(() => ({
  padding: '0.5em !important',
  background: 'whitesmoke',
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
    return (
      <span>
        Error:
        {error.message}
      </span>
    )
  }

  return (
    <StyledClassroomContainer item container>
      <Grid item>
        <ToastContainer />
      </Grid>

      <StyledImageContainer item container>
        {data.image && <img src={data.image.path} alt={alias} />}
      </StyledImageContainer>

      <Grid item>
        <StyledTextContainer>
          {ReactHtmlParser(data.summary)}
        </StyledTextContainer>
      </Grid>
    </StyledClassroomContainer>
  )
}
ClassroomSummaryContent.defaultProps = {
  alias: null,
  id: null,
}

ClassroomSummaryContent.propTypes = {
  alias: PropTypes.string,
  id: PropTypes.string,
}

export default ClassroomSummaryContent
