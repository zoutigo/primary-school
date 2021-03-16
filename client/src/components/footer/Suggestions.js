import { Typography } from '@material-ui/core'
import React from 'react'
import {
  StyledFooterElement,
  StyledFooterElementContent,
  StyledFooterElementText,
  StyledFooterElementTitle,
} from './styles'

function Suggestions() {
  return (
    <StyledFooterElement>
      <StyledFooterElementTitle>
        <Typography variant="h6">Remarques et suggestions</Typography>
      </StyledFooterElementTitle>
      <StyledFooterElementContent>
        <StyledFooterElementText>
          <Typography variant="body2">Proposer un idée pour l'école</Typography>
        </StyledFooterElementText>
        <StyledFooterElementText>
          <Typography variant="body2">Signaler un bug</Typography>
        </StyledFooterElementText>
        <StyledFooterElementText>
          <Typography variant="body2">
            suggerer une amélioration du site
          </Typography>
        </StyledFooterElementText>
      </StyledFooterElementContent>
    </StyledFooterElement>
  )
}

export default Suggestions
