import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { styled } from '@material-ui/styles'

import { StyledNavLink } from '../../utils/componentsStyled'

const StyledTextLink = styled(Box)(({ theme, rubriccolors }) => ({
  textAlign: 'center',
  background: 'transparent',
  minWidth: '100%',
  '&:hover': {
    background: rubriccolors.main,
    color: theme.palette.secondary.dark,
    fontWeight: '600',
  },
  // [theme.breakpoints.up('lg')]: {
  //   minWidth: '13rem',
  // },
}))

const StyledTitleLink = styled(StyledNavLink)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  display: 'inline-block',
}))

function TextLink({
  name,
  link,
  icon,
  categories,
  alias,
  isLogged,
  pathname,
  rubriccolors,
}) {
  return (
    <StyledTextLink rubriccolors={rubriccolors}>
      <StyledTitleLink
        to={{
          pathname: link,
          categories: categories,
          state: {
            from: pathname,
            rubric: {
              name: name,
              alias: alias,
            },
          },
        }}
      >
        <Typography
          variant="h2"
          style={{ marginLeft: '8px', marginRight: '8px' }}
        >
          {alias !== 'private'
            ? name
            : isLogged
            ? 'Espace Privé'
            : `S'identifier`}
        </Typography>
      </StyledTitleLink>
    </StyledTextLink>
  )
}

export default TextLink
