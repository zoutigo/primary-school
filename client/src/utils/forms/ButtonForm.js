import React from 'react'
import { Button, Typography, useTheme, withStyles } from '@material-ui/core'
import formStyles from '../styles'

function ButtonForm({ disabled, label, classes }) {
  const theme = useTheme()

  return (
    <div className={classes.root}>
      <Button
        style={{
          height: '3em',
          marginBottom: '1em',
          background: disabled
            ? theme.palette.grey[400]
            : theme.palette.success.main,
        }}
        disabled={disabled}
        type="submit"
        size="large"
        fullWidth
        variant="contained"
      >
        <Typography variant="button"> {label} </Typography>
      </Button>
    </div>
  )
}

export default withStyles(formStyles)(ButtonForm)
