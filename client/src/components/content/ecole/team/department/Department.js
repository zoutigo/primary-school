import React, { useMemo } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { Box, Typography, withStyles } from '@material-ui/core'

function Department({ department }) {
  const theme = useTheme()

  const StyledDepartment = useMemo(() => {
    return withStyles({
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
    })(Box)
  }, [])
  return (
    <StyledDepartment data-testid="team-department">
      <Typography variant="h3">{department}</Typography>
      <div></div>
    </StyledDepartment>
  )
}

export default Department
