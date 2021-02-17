import React, { useMemo } from 'react'
import { Grid, Typography, withStyles } from '@material-ui/core'

function Member({ gender, firstname, lastname, position }) {
  const StyledGrid = useMemo(() => {
    const styles = (theme) => ({
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
    })
    return withStyles(styles, [{ withTheme: true }])(Grid)
  }, [])

  return (
    <StyledGrid
      item
      container
      data-testid="team-member"
      xs={12}
      sm={12}
      md={12}
      lg={4}
    >
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
