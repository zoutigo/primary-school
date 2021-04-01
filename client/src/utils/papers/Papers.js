import { Grid } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { useTheme } from '@material-ui/styles'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/others.js/ButtonComponent'
import {
  setFormAction,
  setShowPapersForm,
  setShowPapersItems,
  setShowPapersList,
} from '../../redux/papers/papersActions'
import { StyledGridTabContainer } from '../componentsStyled'
import { useDispatchOnMount } from '../hooks'
import PapersContent from './content/PapersContent'
import PaperForm from './form/PaperForm'

function Papers({ paper }) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { showPaperForm, showPaperList, currentPaperItem } = useSelector(
    (state) => state.papers
  )
  const { showPaperItems } = useSelector((state) => state.papers)
  const { def } = paper
  useDispatchOnMount(setShowPapersItems, true)

  return (
    <StyledGridTabContainer container>
      <Grid item container md={12} lg={12}>
        {showPaperList && <PapersContent paper={paper} />}
      </Grid>
      <Grid item container>
        {showPaperList && showPaperItems && def !== 'page' && (
          <ButtonComponent
            text={'poster un evenement'}
            icon={<SendIcon />}
            background={theme.palette.primary.main}
            onClick={() => {
              dispatch(setShowPapersForm(true))
              dispatch(setShowPapersList(false))
              dispatch(setFormAction('create'))
            }}
          />
        )}
      </Grid>
      <Grid item container>
        {showPaperForm && <PaperForm paper={paper} />}
      </Grid>
    </StyledGridTabContainer>
  )
}

export default Papers
