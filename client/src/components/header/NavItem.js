import React, { useState } from 'react'
import { Box, styled } from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {
  setCredentials,
  setIsLogged,
  setToken,
} from '../../redux/user/userActions'
import TextLink from './TextLink'
import SubTextLink from './SubTextLink'
import { usePaletteColors } from '../../utils/hooks'
import { withTheme } from '@material-ui/styles'

const StyledNavItem = styled(({ clicked, ...rest }) => <Box {...rest} />)({
  minHeight: '100%',
  minWidth: '100%',
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

function NavItem({ rubric, ind }) {
  const { icon, alias } = rubric

  const { pathname, state } = useLocation()

  const dispatch = useDispatch()
  const history = useHistory()

  const { isLogged, Token } = useSelector((state) => state.user)
  const { tokenIsValid } = Token
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
      <nav onClick={() => setClicked(true)}>
        <StyledIconBox color={rubriccolors.main}> {icon} </StyledIconBox>
        <TextLink {...rubric} isLogged pathname rubriccolors={rubriccolors} />
        <StyledLine active={activeRubric} />
      </nav>

      <SubTextLink
        {...rubric}
        pathname
        setClicked={setClicked}
        handleLoggout={handleLoggout}
        rubriccolors={rubriccolors}
      />
    </StyledNavItem>
  )
}

export default NavItem
