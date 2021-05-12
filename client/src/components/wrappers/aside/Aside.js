import { Grid, styled } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useLocationColor } from '../../../utils/hooks'
import AsideBodyContainer from './AsideBodyContainer'
import AsideTitle from './AsideTitle'

const StyledAsideContainer = styled(Grid)(({ theme }) => ({
  paddingLeft: '10% !important',
  overflow: 'hidden',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '0px !important',
  },
}))

function Aside({ title, items }) {
  const rubricColors = useLocationColor()

  return (
    <StyledAsideContainer container item>
      <AsideTitle rubricColors={rubricColors} title={title} />
      <AsideBodyContainer items={items} rubricColors={rubricColors} />
    </StyledAsideContainer>
  )
}

Aside.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.element, PropTypes.string).isRequired,
}

export default Aside
