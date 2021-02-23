import { option, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React from 'react'
import styles from './styles'

const SelectInput = React.forwardRef(({ classes, errors, ...rest }, ref) => {
  const [value, setValue] = React.useState('')

  const { options, initialValue } = rest
  const handleChange = (event) => {
    const optionValue = event.target.value
    console.log(optionValue)
    setValue(optionValue)
  }

  return (
    <section id="text-field-select" className={classes.textfield}>
      <TextField
        {...rest}
        inputRef={ref}
        select
        value={value}
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      >
        <option value="">{initialValue}</option>
        {options.map((option, i) => (
          <option key={i} value={option[1]}>
            {option[0]}
          </option>
        ))}
      </TextField>
      <span>{errors.select?.message}</span>
    </section>
  )
})

export default withStyles(styles)(SelectInput)
