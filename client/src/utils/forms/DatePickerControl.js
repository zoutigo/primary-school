import React, { useState } from 'react'
import { Controller, useController } from 'react-hook-form'
import { DatePicker } from '@material-ui/pickers'

function DatePickerControl({ control, name, initialdate, ...rest }) {
  const {
    field: { ref, ...inputProps },
    meta: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: initialdate,
  })

  return (
    <DatePicker
      {...inputProps}
      inputRef={ref}
      autoOk
      clearable
      format="dd Do MMMM yyyy"
      minDate={new Date()}
      {...rest}
    />
  )
}

export default DatePickerControl
