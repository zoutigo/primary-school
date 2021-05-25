import React, { useState, useEffect } from 'react'
import { Box, styled } from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/styles'
import {
  setCredentials,
  setIsLogged,
  setToken,
} from '../../redux/user/userActions'
import TextLink from './TextLink'
import SubTextLink from './SubTextLink'
import { usePaletteColors } from '../../utils/hooks'

const StyledNavItem = styled(({ clicked, ...rest }) => <Box {...rest} />)({
  minHeight: '100%',
  minWidth: 'calc(100%/6)',
  '& nav': {
    width: '100%',
  },
  '&:hover': {
    // background:theme.palette.primary.main,
    '& >div': {
      // display: clicked ? 'none' : 'block',
      display: ({ clicked }) => (clicked ? 'none' : 'block'),
    },
  },
})

const StyledIconBox = withTheme(
  styled(({ color, theme, ...rest }) => <Box {...rest} />)({
    color: ({ color }) => color,
    marginTop: ({ theme }) => theme.spacing(2),
    textAlign: 'center',
  })
)

const StyledLine = withTheme(
  styled(({ active, theme, ...rest }) => <Box {...rest} />)({
    minHeight: '3px',
    width: '50px',
    margin: '0px auto !important',
    background: ({ active, theme: { palette } }) =>
      active ? palette.secondary.dark : 'transparent',
  })
)

function NavItem({ rubric }) {
  const { icon, alias } = rubric

  const { pathname, state } = useLocation()

  const dispatch = useDispatch()
  const history = useHistory()

  const [clicked, setClicked] = useState(false)
  const [activeRubric, setActiveRubric] = useState(false)

  useEffect(() => {
    const handleClick = () => {
      setClicked(false)
    }

    window.addEventListener('mousemove', handleClick)
    return () => {
      window.removeEventListener('mousemove', handleClick)
    }
  }, [clicked])

  useEffect(() => {
    if (pathname !== '/' && state && state.rubric.alias === alias) {
      setActiveRubric(true)
    }

    return () => {
      setActiveRubric(false)
    }
  }, [pathname])

  const handleLoggout = () => {
    dispatch(setIsLogged())
    dispatch(setToken(null))
    dispatch(setCredentials({}))
    history.push('/')
  }

  const rubriccolors = usePaletteColors(alias)

  return (
    <StyledNavItem clicked={clicked}>
      <nav onClick={() => setClicked(true)} role="presentation">
        <StyledIconBox color={rubriccolors.main}>{icon}</StyledIconBox>
        <TextLink {...rubric} isLogged pathname rubriccolors={rubriccolors} />
        <StyledLine active={activeRubric} />
      </nav>

      <SubTextLink
        {...rubric}
        pathname={pathname}
        setClicked={setClicked}
        handleLoggout={handleLoggout}
        rubriccolors={rubriccolors}
      />
    </StyledNavItem>
  )
}

NavItem.propTypes = {
  rubric: PropTypes.shape({
    alias: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
  }).isRequired,
}

export default NavItem
