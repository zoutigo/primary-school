import { Icon, styled } from '@material-ui/core'

import React from 'react'

const StyledBaseIcon = styled(Icon)(({ theme, costumcolor }) => ({
  boxSizing: 'border-box',
  fontSize: '5rem',
  color: costumcolor,
}))

function IconComponent({ icon, costumcolor }) {
  return <StyledBaseIcon costumcolor={costumcolor}>{icon} </StyledBaseIcon>
}

export default IconComponent
