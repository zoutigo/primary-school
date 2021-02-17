import React, { useMemo } from 'react'
import { Box, Typography, withStyles } from '@material-ui/core'

function Department({ department }) {
  const StyledDepartment = useMemo(() => {
    const styles = (theme) => ({
      root: {
        color: theme.palette.secondary.main,
        textTransform: 'capitalize',
        '& div': {
          height: '3px',
          width: '100%',
          background: theme.palette.primary.main,
          marginTop: '1em',
          marginBottom: '1em',
        },
      },
    })
    return withStyles(styles, [{ withTheme: true }])(Box)
  }, [])
  return (
    <StyledDepartment data-testid="team-department">
      <Typography variant="h3">{department}</Typography>
      <div data-testid="team-department-spacer"></div>
    </StyledDepartment>
  )
}

export default Department
