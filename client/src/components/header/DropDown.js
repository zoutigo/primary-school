import { Icon, styled } from '@material-ui/core'
import React from 'react'

const StyledItemContainer = styled(Box)(({ theme, background, color }) => ({
  textAlign: 'center',
  background: 'transparent',
  minWidth: '100%',
  '&:hover': {
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
}))
const StyledIcon = styled(Icon)(() => ({}))

const StyledDropDownHead = styled('nav')(() => ({}))
const StyledDropDownBody = styled(Box)(() => ({}))
const StyledDropDownItem = styled(Box)(() => ({}))

function DropDown(title, items, textColor, bgcolor) {
  const DropdownItem = () => {
    return <StyledDropDownItem></StyledDropDownItem>
  }
  return (
    <StyledDropDownBox>
      <StyledDropDownHead>
        <StyledIcon></StyledIcon>
        <StyledItemContainer></StyledItemContainer>
      </StyledDropDownHead>
      <StyledDropDownBody>
        {items.map((item, i) => (
          <DropdownItem />
        ))}
      </StyledDropDownBody>
    </StyledDropDownBox>
  )
}

export default DropDown
