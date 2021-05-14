import React from 'react'
import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import image from '../../../../images/rubrics/home/landing/land7.JPG'
import FiguresCard from './FiguresCard'

const StyledFiguresContainer = styled(Grid)(() => ({
  width: '100vw',
  minHeight: '70vh',
  backgroundSize: '2100px',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: '-8vh',
  backgroundPosition: 'top  , right',
  background: `url(${image})`,
  alignItems: 'center',
  position: 'relative',
}))

const matrix = [
  [
    [100, 50],
    [100, 50],
    [100, 200],
    [10, '10vw'],
    [10, '30vw'],
  ],
  [
    [500, 700],
    [500, 700],
    [500, 700],
    [180, '40vw'],
    [180, '30vw'],
  ],
  [
    [200, 1100],
    [200, 1100],
    [200, 1100],
    [360, '10vw'],
    [350, '30vw'],
  ],
  [
    [400, 1500],
    [400, 1500],
    [400, 1500],
    [520, '70vw'],
    [520, '30vw'],
  ],
]

function Figures() {
  const items = [
    ['Eleves', 218, 0, '#85C48E', matrix[0]],
    ['Familles', 100, 1, '#C389BC', matrix[1]],
    ['Enseignants', 25, 2, '#EE701D', matrix[2]],
    ['Jeux', 49, 3, '#F9CE46', matrix[3]],
  ]

  return (
    <StyledFiguresContainer container>
      {items.map((item) => (
        <FiguresCard figureitem={item} key={item} />
      ))}
    </StyledFiguresContainer>
  )
}

export default Figures
