import { Typography } from '@material-ui/core'
import React from 'react'
import AvTimerIcon from '@material-ui/icons/AvTimer'
import {
  StyledFooterElement,
  StyledFooterElementContent,
  StyledFooterElementText,
  StyledFooterElementTitle,
} from './styles'
import { H3Title } from '../../utils/components'

function Timing() {
  return (
    <StyledFooterElement>
      <StyledFooterElementTitle>
        {H3Title('Les horaires')}
      </StyledFooterElementTitle>
      <StyledFooterElementContent>
        <StyledFooterElementText>
          <AvTimerIcon />
          <Typography variant="body2">Lundi-Vendredi: 07.45 - 18.00</Typography>
        </StyledFooterElementText>
      </StyledFooterElementContent>
    </StyledFooterElement>
  )
}

export default Timing
