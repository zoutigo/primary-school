import React, { useMemo } from 'react'
import { useTheme } from '@material-ui/styles'
import { Grid, Typography, withStyles } from '@material-ui/core'

function Member({ gender, firstname, lastname, position }) {
  const theme = useTheme()

  const StyledGrid = useMemo(() => {
    return withStyles({
      root: {
        paddingTop: '1em',
        paddingBottom: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: '32%',
        '& >div:first-child': {
          height: '4vh',
          display: 'flex',
          justifyContent: 'center',
          '& div': {},
          '& >div:first-child': {
            textTransform: 'capitalize',
            margin: '0 10px',
          },
          '& >div:nth-child(2)': {
            textTransform: 'capitalize',
          },
          '& >div:last-child': {
            margin: '0 4px',

            textTransform: 'uppercase',
          },
        },
        '& >div:last-child': {
          textAlign: 'center',
          color: theme.palette.primary.main,
        },
      },
    })(Grid)
  }, [])
  return (
    <StyledGrid item container data-testid="team-member">
      <div>
        <div>
          <Typography variant="h5">{gender}</Typography>
        </div>
        <div>
          <Typography variant="h5">{firstname}</Typography>{' '}
        </div>
        <div>
          <Typography variant="h5">{lastname}</Typography>{' '}
        </div>
      </div>
      <div>
        <Typography variant="h6">{position}</Typography>
      </div>
    </StyledGrid>
  )
}

export default Member
