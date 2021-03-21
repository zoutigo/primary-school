import { Link, Typography } from '@material-ui/core'
import React from 'react'
import { H3Title } from '../../utils/components'
import FooterCard from './card/FooterCard'
import {
  StyledFooterElement,
  StyledFooterElementContent,
  StyledFooterElementText,
  StyledFooterElementTitle,
} from './styles'

function Suggestions() {
  const suggestions = [
    {
      name: "proposer un idée à l'école",
      link: '/informations/contacts',
    },
    {
      name: 'suggérer une amélioration du site',
      link: '/informations/contacts',
    },
    {
      name: 'signaler un bug',
      link: '/informations/contacts',
    },
  ]

  const items = suggestions.map((partner) => {
    const { link, name } = partner
    return (
      <StyledFooterElementText>
        <Typography variant="body2">
          <Link href={link} target="blank">
            {name}
          </Link>
        </Typography>
      </StyledFooterElementText>
    )
  })

  const title = 'Améliorations'
  return <FooterCard items={items} title={title} />
}

export default Suggestions
