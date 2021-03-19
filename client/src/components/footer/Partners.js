import { Typography } from '@material-ui/core'
import React from 'react'
import { H3Title } from '../../utils/components'
import {
  StyledFooterElement,
  StyledFooterElementContent,
  StyledFooterElementText,
  StyledFooterElementTitle,
} from './styles'

function Partners() {
  return (
    <StyledFooterElement>
      <StyledFooterElementTitle>
        {H3Title('Nos Partenaires')}
      </StyledFooterElementTitle>
      <StyledFooterElementContent>
        <StyledFooterElementText>
          <Typography variant="body2">La paroisse Saint Jacques</Typography>
        </StyledFooterElementText>
        <StyledFooterElementText>
          <Typography variant="body2">APEL nationale</Typography>
        </StyledFooterElementText>
        <StyledFooterElementText>
          <Typography variant="body2">OGEC nationale</Typography>
        </StyledFooterElementText>
      </StyledFooterElementContent>
    </StyledFooterElement>
  )
}

export default Partners
