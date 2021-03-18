import { Box, styled, Typography } from '@material-ui/core'
import React from 'react'
import { StyledNavLink } from '../../utils/componentsStyled'

const StyledSubTextLinkContainer = styled(Box)(({ theme, clicked }) => ({
  display: 'none',
  position: 'absolute',
  zIndex: 1,
  width: '13.7vw',
  background: 'whitesmoke',
}))
const StyledSubTextLink = styled(Box)(({ theme, rubriccolors }) => ({
  position: 'relative',
  display: 'block',
  minHeight: theme.spacing(5),
  borderTop: 'white solid 1px',
  '&:hover ': {
    background: rubriccolors.main,
    color: theme.palette.secondary.dark,
    '& div': {
      display: 'inline-block',
    },
  },
  '& div': {
    display: 'none',
    background: 'pink',
    position: 'absolute',
    top: 0,
    left: '100%',
    minWidth: '15em',
    zIndex: 1,
    '& li': {
      display: 'block',
      minHeight: '3em',
      background: theme.palette.primary.light,
      color: 'black',
      borderTop: 'white solid 1px',
    },
    '& li:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
}))

const StyledTitleLink = styled(StyledNavLink)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  display: 'inline-block',
}))

function SubTextLink({
  name,
  link,
  icon,
  categories,
  alias,
  pathname,
  setClicked,
  clicked,
  handleLoggout,
  isLogged,
  rubriccolors,
}) {
  return (
    <StyledSubTextLinkContainer clicked={clicked}>
      {categories &&
        categories.map(
          (category, index) => {
            return alias === 'private' &&
              isLogged &&
              (category.alias === 'login' ||
                category.alias === 'register') ? null : alias === 'private' &&
              !isLogged &&
              (category.alias === 'loggout' ||
                category.alias === 'my-account') ? null : (
              <StyledSubTextLink
                key={index}
                clicked
                onClick={() => setClicked(true)}
                rubriccolors={rubriccolors}
              >
                {category.alias === 'loggout' ? (
                  <Typography
                    variant="h3"
                    style={{ marginLeft: '8px', cursor: 'pointer' }}
                    onClick={handleLoggout}
                  >
                    {category.designation}
                  </Typography>
                ) : (
                  <StyledNavLink
                    to={{
                      pathname: category.link,
                      rubric: name,
                      category: category.designation,
                      chapters: category.chapters,
                      state: {
                        from: pathname,
                        rubric: {
                          name: name,
                          alias: alias,
                        },
                        category: {
                          name: category.designation,
                          alias: category.alias,
                          chapters: category.chapters,
                        },
                      },
                    }}
                  >
                    <Typography variant="h3" style={{ marginLeft: '8px' }}>
                      {' '}
                      {category.designation}{' '}
                    </Typography>
                  </StyledNavLink>
                )}
              </StyledSubTextLink>
            )
          }
          // end of the map
        )}
    </StyledSubTextLinkContainer>
  )
}

export default SubTextLink
