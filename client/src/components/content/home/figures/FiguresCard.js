import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@material-ui/core'
import { styled, withTheme } from '@material-ui/styles'
import { useWindowSize } from '../../../../utils/hooks'

const initialPositions = [
  [100, 200],
  [500, 700],
  [200, 1100],
  [400, 1500],
]

const matrix = [
  [
    [100, 50],
    [100, 50],
    [100, 200],
    [100, 200],
    [100, 200],
  ],
  [
    [500, 700],
    [500, 700],
    [500, 700],
    [500, 700],
    [500, 700],
  ],
  [
    [200, 1100],
    [200, 1100],
    [200, 1100],
    [200, 1100],
    [200, 1100],
  ],
  [
    [400, 1500],
    [400, 1500],
    [400, 1500],
    [400, 1500],
    [400, 1500],
  ],
]

const StyledFigureCard = withTheme(
  styled(({ positions, theme, ...rest }) => <Box {...rest} />)({
    position: 'absolute',
    [(theme) => theme.breakpoints.up('lg')]: {
      top: ({ positions }) => positions[0][0],
      left: ({ positions }) => positions[0][1],
    },
    [(theme) => theme.breakpoints.between('md', 'lg')]: {
      top: ({ positions }) => positions[1][0],
      left: ({ positions }) => positions[1][1],
    },
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
  const [designation, count, index, bgcolor, positions] = figureitem

  const StyledFigureCards = styled(Box)(({ theme }) => ({
    position: 'absolute',
    [theme.breakpoints.up('lg')]: {
      top: positions[0][0],
      left: positions[0][1],
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      top: positions[3][0],
      left: positions[3][1],
    },
    [theme.breakpoints.down('xs')]: {
      top: positions[4][0],
      left: positions[4][1],
    },
  }))
  return (
    <StyledFigureCards positions={positions}>
      <StyledAvatar bgcolor={bgcolor}>
        <StyledDesignationTypo variant="h4">
          {designation}
        </StyledDesignationTypo>

        <StyledCountTypo variant="h3">{count}</StyledCountTypo>
      </StyledAvatar>
    </StyledFigureCards>
  )
}

FiguresCard.propTypes = {
  figureitem: PropTypes.arrayOf(PropTypes.string, PropTypes.number).isRequired,
}

export default FiguresCard
