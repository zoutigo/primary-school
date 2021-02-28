import { option, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUpdatePageAlias } from '../../redux/admin/adminActions'
import styles from './styles'

const SelectInput = React.forwardRef(({ classes, errors, ...rest }, ref) => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('')

  const { options, initial } = rest
  const handleChange = (event) => {
    const optionValue = event.target.value

    setValue(optionValue)
    dispatch(setCurrentUpdatePageAlias(optionValue))
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
        <option value="">{initial}</option>
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
