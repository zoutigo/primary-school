import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { styled } from '@material-ui/styles'

const StyledButton = styled(Button)(
  ({
    theme,
    color,
    hovercolor,
    hoverbackground,
    background,
    width,
    minwidth,
  }) => ({
    marginTop: '1rem !important',
    background: background,
    height: '2.6rem',
    width: width,
    minWidth: minwidth,
    color: color,
    '&:hover': {
      background: hoverbackground,
      color: hovercolor,
    },
  })
)

const StyledTypo = styled(Typography)(() => ({
  marginLeft: '1rem !important',
}))

function ButtonComponent({
  icon,
  text,
  color,
  hovercolor,
  background,
  hoverbackground,
  width,
  minwidth,
}) {
  return (
    <StyledButton
      type="button"
      startIcon={icon}
      color={color}
      hovercoor={hovercolor}
      background={background}
      hoverbackground={hoverbackground}
      minwidth={minwidth}
      width={width}
    >
      <StyledTypo variant="button">{text}</StyledTypo>
    </StyledButton>
  )
}

export default ButtonComponent