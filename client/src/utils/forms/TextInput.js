import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React from 'react'
import { useLocation } from 'react-router'
import styles from './styles'

const TextInput = React.forwardRef(({ classes, errors, ...rest }, ref) => {
  const { state, rubric } = useLocation()

  return (
    <section id="text-field-box" className={classes.textfield}>
      <TextField
        {...rest}
        required
        inputRef={ref}
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <span>{errors?.message}</span>
    </section>
  )
})

export default withStyles(styles)(TextInput)
