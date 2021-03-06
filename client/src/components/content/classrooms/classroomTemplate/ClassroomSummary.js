import { Box, styled, ButtonGroup, Button } from '@material-ui/core'
import React, { useState } from 'react'
import ImageForm from './forms/ImageForm'
import SummaryForm from './forms/SummaryForm'

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
const StyledButtonGroup = styled(ButtonGroup)(({ theme, bgcolor }) => ({
  height: '3em',
}))
const StyledButton = styled(Button)(({ theme, bgcolor }) => ({
  height: '3em',
  background: theme.palette.primary.main,
  padding: '0.5em 1em !important',
}))

function ClassroomSummary({ alias, summary, image, id }) {
  const [show, setShow] = useState({
    buttonGroup: true,
    imageForm: false,
    summaryForm: false,
  })
  const handleClick = (item) => {
    switch (item) {
      case 'summary':
        setShow({
          buttonGroup: false,
          imageForm: false,
          summaryForm: true,
        })
        break
      case 'image':
        setShow({
          buttonGroup: false,
          imageForm: true,
          summaryForm: false,
        })
        break

      default:
        return setShow(show)
    }
  }

  return (
    <StyledClassroomContainer>
      <StyledImageContainer>
        <img src={image} />
      </StyledImageContainer>
      <StyledTextContainer>{summary}</StyledTextContainer>
      {show.buttonGroup && (
        <StyledButtonGroup>
          <StyledButton
            onClick={() => {
              handleClick('summary')
            }}
          >
            Modifier le texte
          </StyledButton>
          <StyledButton
            onClick={() => {
              handleClick('image')
            }}
          >
            Modifier l'image
          </StyledButton>
        </StyledButtonGroup>
      )}

      {show.imageForm && <ImageForm setShow={setShow} />}
      {show.summaryForm && (
        <SummaryForm
          show={show}
          setShow={setShow}
          id={id}
          alias={alias}
          summaryText={summary}
        />
      )}
    </StyledClassroomContainer>
  )
}

export default ClassroomSummary
