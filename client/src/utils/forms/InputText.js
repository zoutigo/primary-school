import React from 'react'
import { TextField } from '@material-ui/core'
import { useController } from 'react-hook-form'

function InputText({ control, name, ...rest }) {
  const {
    field: { ref, ...inputProps },
    meta: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: '',
  })

  return <TextField {...inputProps} inputRef={ref} {...rest} />
}

export default InputText
