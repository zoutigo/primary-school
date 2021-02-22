import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React from 'react'
import { useLocation } from 'react-router'
import styles from './styles'

const EmailInput = React.forwardRef(({ classes, errors, ...rest }, ref) => {
  const { state, rubric } = useLocation()
  const helperMessage = 'Renseignez votre adresse mail'

  return (
    <section id="text-field-box" className={classes.textfield}>
      <TextField
        {...rest}
        required
        inputRef={ref}
        type="email"
        helperText={helperMessage}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <span>{errors.email?.message}</span>
    </section>
  )
})

export default withStyles(styles)(EmailInput)
