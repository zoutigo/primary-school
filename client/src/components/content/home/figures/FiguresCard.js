import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@material-ui/core'
import { styled, withTheme } from '@material-ui/styles'

const positions = [
  [100, 200],
  [500, 700],
  [200, 1100],
  [400, 1500],
]

const StyledFigureCard = withTheme(
  styled(({ index, theme, ...rest }) => <Box {...rest} />)({
    position: 'absolute',
    top: ({ index }) => positions[index][0],
    left: ({ index }) => positions[index][1],
  })
)

const StyledAvatar = withTheme(
  styled(({ bgcolor, ...rest }) => <Avatar {...rest} />)({
    width: '150px',
    height: '150px',
    position: 'relative',
    background: ({ bgcolor }) => bgcolor,
  })
)

const StyledCountTypo = styled(Typography)(() => ({
  position: 'absolute',
  top: 0,
  fontSize: '3rem',
}))

const StyledDesignationTypo = styled(Typography)(() => ({
  position: 'absolute',
  top: 90,
}))

function FiguresCard({ figureitem }) {
  const [designation, count, index, bgcolor] = figureitem
  return (
    <StyledFigureCard index={index}>
      <StyledAvatar bgcolor={bgcolor}>
        <StyledDesignationTypo variant="h4">
          {designation}
        </StyledDesignationTypo>

        <StyledCountTypo variant="h3">{count}</StyledCountTypo>
      </StyledAvatar>
    </StyledFigureCard>
  )
}

FiguresCard.propTypes = {
  figureitem: PropTypes.arrayOf(PropTypes.string, PropTypes.number).isRequired,
}

export default FiguresCard
