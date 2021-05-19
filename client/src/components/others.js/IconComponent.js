import { Icon, styled } from '@material-ui/core'

import React from 'react'
import PropTypes from 'prop-types'

const StyledBaseIcon = styled(Icon)(({ costumcolor }) => ({
  boxSizing: 'border-box',
  fontSize: '5rem',
  color: costumcolor,
}))

function IconComponent({ icon, costumcolor }) {
  return <StyledBaseIcon costumcolor={costumcolor}>{icon}</StyledBaseIcon>
}

IconComponent.propTypes = {
  icon: PropTypes.element.isRequired,
  costumcolor: PropTypes.string.isRequired,
}

export default IconComponent
