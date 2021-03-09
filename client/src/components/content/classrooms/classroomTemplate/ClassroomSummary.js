import { Box, styled, ButtonGroup, Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import ImageForm from './forms/ImageForm'
import SummaryForm from './forms/SummaryForm'

import { ToastContainer } from 'react-toastify'

import { useSelector } from 'react-redux'
import ClassroomSummaryContent from './ClassroomSummaryContent'

const StyledClassroomContainer = styled(Grid)(({ theme, bgcolor }) => ({
  padding: '0.5em !important',
  background: 'blue',
  display: 'flex',
  flexDirection: 'column',
}))

const StyledButtonGroup = styled(ButtonGroup)(({ theme, bgcolor }) => ({
  height: '3em',
  marginTop: '1em !important',
  background: 'green',
}))
const StyledButton = styled(Button)(({ theme, bgcolor }) => ({
  height: '3em',
  background: theme.palette.primary.main,
  padding: '0.5em 1em !important',
}))

function ClassroomSummary({ alias, id: classroomId, summary }) {
  const token = useSelector((state) => state.user.Token.token)

  const [imageForm, setImageForm] = useState(false)
  const [summaryForm, setSummaryForm] = useState(false)
  const [buttonGroup, setButtonGroup] = useState(true)
  const [summaryContent, setSummaryContent] = useState(true)

  return (
    <StyledClassroomContainer container>
      <ToastContainer />

      <Grid item container md={12} lg={12}>
        {summaryContent && (
          <ClassroomSummaryContent id={classroomId} alias={alias} />
        )}
      </Grid>
      <Grid item container md={12} lg={12}>
        {buttonGroup && (
          <StyledButtonGroup>
            <StyledButton
              onClick={() => {
                setSummaryForm(true)
                setButtonGroup(false)
                setSummaryContent(false)
              }}
            >
              Modifier le texte
            </StyledButton>
            <StyledButton
              onClick={() => {
                setImageForm(true)
                setButtonGroup(false)
                setSummaryContent(false)
              }}
            >
              Modifier l'image
            </StyledButton>
          </StyledButtonGroup>
        )}
      </Grid>
      <Grid item container md={12} lg={12}>
        {imageForm && (
          <ImageForm
            id={classroomId}
            alias={alias}
            setButtonGroup={setButtonGroup}
            setImageForm={setImageForm}
            setSummaryContent={setSummaryContent}
          />
        )}
        {summaryForm && (
          <SummaryForm
            id={classroomId}
            alias={alias}
            setButtonGroup={setButtonGroup}
            setSummaryForm={setSummaryForm}
            setSummaryContent={setSummaryContent}
          />
        )}
      </Grid>
    </StyledClassroomContainer>
  )
}

export default ClassroomSummary
