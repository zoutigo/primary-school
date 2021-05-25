import { Box, styled, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { StyledNavLink } from '../../utils/componentsStyled'
import randomkey from '../../utils/randomkey'

const StyledSubTextLinkContainer = styled(Box)(() => ({
  display: 'none',
  position: 'absolute',
  zIndex: 2,
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

function SubTextLink({
  name,
  categories,
  alias,
  pathname,
  setClicked,
  handleLoggout,
  isLogged,
  rubriccolors,
}) {
  return (
    <StyledSubTextLinkContainer
      onClick={() => {
        setClicked(true)
      }}
    >
      {categories &&
        categories.map((category) => {
          if (
            alias === 'private' &&
            isLogged &&
            (category.alias === 'login' || category.alias === 'register')
          ) {
            return null
          }
          if (
            alias === 'private' &&
            !isLogged &&
            (category.alias === 'loggout' || category.alias === 'my-account')
          ) {
            return null
          }
          return (
            <StyledSubTextLink
              key={randomkey(987654)}
              onClick={() => setClicked(true)}
              rubriccolors={rubriccolors}
            >
              {category.alias === 'loggout' ? (
                <Typography
                  variant="h4"
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
                  <Typography variant="h4" style={{ marginLeft: '8px' }}>
                    {category.designation}
                  </Typography>
                </StyledNavLink>
              )}
            </StyledSubTextLink>
          )
        })}
    </StyledSubTextLinkContainer>
  )
}

SubTextLink.defaultProps = {
  isLogged: false,
}

SubTextLink.propTypes = {
  name: PropTypes.string.isRequired,

  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(
      PropTypes.shape({
        alias: PropTypes.string,
        designation: PropTypes.string,
        link: PropTypes.string,
        route: PropTypes.shape({
          path: PropTypes.string,
          exact: PropTypes.bool,
          component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        }),
      })
    ).isRequired,
  ]).isRequired,
  alias: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  setClicked: PropTypes.func.isRequired,
  handleLoggout: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
  rubriccolors: PropTypes.shape({
    main: PropTypes.string,
  }).isRequired,
}

export default SubTextLink
