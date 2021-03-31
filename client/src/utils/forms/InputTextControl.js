import React from 'react'
import { useController } from 'react-hook-form'
import { StyledInputTextFieldControl } from '../componentsStyled'

function InputTextControl({ control, name, initialvalue, ...rest }) {
  const {
    field: { ref, ...inputProps },
    meta: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: initialvalue,
  })

  return (
    <StyledInputTextFieldControl {...inputProps} inputRef={ref} {...rest} />
  )
}

export default InputTextControl
