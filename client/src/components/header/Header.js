import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import CancelIcon from '@material-ui/icons/Cancel'

import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { styled } from '@material-ui/styles'

import { toogleSmallScreenMenu } from '../../redux/settings/settingsActions'
import NavItem from './NavItem'

import rubrics from '../../utils/rubrics'

import Logo from './Logo'
import randomkey from '../../utils/randomkey'

const StyledHeader = styled('div')(() => ({
  width: '100%',
  background: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '12vh',
}))

const StyledHeaderNav = styled('nav')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  flex: 10,
  background: 'transparent',

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const StyledHeaderIconBox = styled('div')(({ theme }) => ({
  marginRight: '2rem !important',
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

const StyledMenuIcon = styled(MenuIcon)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
}))

const StyledCancelIcon = styled(CancelIcon)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
}))

function Header() {
  const dispatch = useDispatch()

  const smallScreenMenuIsOpened = useSelector(
    (state) => state.settings.smallScreenMenuIsOpened
  )

  return (
    <StyledHeader>
      <Logo />
      <StyledHeaderNav>
        {rubrics.map((rubric, index) => {
          if (rubric.alias !== 'home') {
            return (
              <NavItem rubric={rubric} ind={index} key={randomkey(9876554)} />
            )
          }
          return null
        })}
      </StyledHeaderNav>

      <StyledHeaderIconBox>
        <StyledIconButton onClick={() => dispatch(toogleSmallScreenMenu())}>
          {!smallScreenMenuIsOpened ? <StyledMenuIcon /> : <StyledCancelIcon />}
        </StyledIconButton>
      </StyledHeaderIconBox>
    </StyledHeader>
  )
}

export default Header
