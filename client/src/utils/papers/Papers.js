import { Grid } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { useTheme } from '@material-ui/styles'

import React, { useState } from 'react'
import ButtonComponent from '../../components/others.js/ButtonComponent'
import { StyledGridTabContainer } from '../componentsStyled'
import PapersContent from './content/PapersContent'
import PaperForm from './form/PaperForm'

function Papers({ paper }) {
  const theme = useTheme()
  const [paperContent, setPaperContent] = useState(true)
  const [paperForm, setPaperForm] = useState(false)
  const [buttonGroup, setButtonGroup] = useState(true)

  return (
    <StyledGridTabContainer container>
      <Grid item container md={12} lg={12}>
        {paperContent && <PapersContent paper={paper} />}
      </Grid>
      <Grid item container>
        {buttonGroup && (
          <ButtonComponent
            text={'poster un evenement'}
            icon={<SendIcon />}
            background={theme.palette.primary.main}
            onClick={() => {
              setPaperContent(false)
              setPaperForm(true)
              setButtonGroup(false)
            }}
          />
        )}
      </Grid>
      <Grid item container>
        {paperForm && (
          <PaperForm
            paper={paper}
            setPaperContent={setPaperContent}
            setPaperForm={setPaperForm}
            setButtonGroup={setButtonGroup}
          />
        )}
      </Grid>
    </StyledGridTabContainer>
  )
}

export default Papers
